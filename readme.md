# Mongo Handler

This is a very simple personal package but use it if you feel like it.

This package is meant to just serve as a quick start to connecting to a mongodb database.

It also has some simply error handling

usage:

```js
const { MongoClient } = require('@titus_entertainment/mongohandler');

// The package allows you to simply add your mongodb uri to connect to
const db = new MongoClient({ url: 'mymongodburi' });
```