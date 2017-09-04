const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const ObjectID = mongodb.ObjectID;
const mongo = mongodb.MongoClient;

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongo.connect(process.env.MONGODB_URI, (err, database) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  let db = database;
  console.log('Database connection ready');

  let server = app.listen(process.env.PORT || 3000, () => {
    let port = server.address().port;
    console.log(`App now running on port: ${port}`);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log(`Error: ${reason}`);
  res.status(code || 500).json({ error: message });
}

app.get('/', (req, res) => {
  res.send('Hi from my App');
});
app.get('/symbol', (req, res) => {
  let { newDoc } = req.body;
  db.collection('symbols').find({ newDoc }).toArray((err, docs) => {
    if (err) {
      handleError(err, err.message, 'Failed to retreive symbol.');
    }
    else {
      res.status(200).json(docs);
    }
  });
});
app.post('/symbol', (req, res) => {
  let { newDoc } = req.body;
  db.collection('symbols').insertOne({ newDoc }, (err, docs) => {
    if (err) {
      handleError(err, err.message, 'Failed to save symbol.');
    }
    else {
      res.status(201).json(docs);
    }
  });
});
