import * as mongoose from 'mongoose';
import { Logger } from '@ayana/logger';
const logger = Logger.get('mongoDB');

interface DbOptions {
  dbName?: string | null;
  url?: string | null;
}

export class MongoHandler {
  private connection: mongoose.Connection = mongoose.connection;
  private Host: string;
  private config: DbOptions;

  constructor(config: DbOptions = {}) {
    this.config = config;
    if (config.url) {
      this.Host = config.url;
    } else if (!config.url && config.dbName) {
      this.Host = `mongodb://localhost:27017/${this.config.dbName}`;
    } else {
      this.Host = 'mongodb://localhost:27017/Default_Mongoose_Class_Name';
    }

    this.connection.on('connected', () => {
      logger.info(`Connected to db:`);
    });

    this.connection.on('err', (err: Error) => {
      logger.error(err);
    });

    this.connection.on('disconnected', () => {
      logger.warn(`Disconnected from database`);
    });
  }

  public async init() {
    return await mongoose.connect(this.Host, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    });
  }
}
