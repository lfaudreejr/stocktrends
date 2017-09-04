const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const path = require('path');

const ObjectID = mongodb.ObjectID;
const mongo = mongodb.MongoClient;

if (process.env.NODE_ENV !== 'production') {
  const cors = require('cors');
  require('dotenv').config();
  app.use(cors());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'dev') {
  app.use('/', express.static(path.join(__dirname, './build')));
}

mongo.connect(process.env.MONGODB_URI, (err, database) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  let db = database;
  console.log('Database connection ready');

  server.listen(process.env.PORT || 3000, () => {
    let port = server.address().port;
    console.log(`App now running on port: ${port}`);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log(`Error: ${reason}`);
  res.status(code || 500).json({ error: message });
}

// app.get('/symbol', (req, res) => {
//   let { newDoc } = req.body;
//   db.collection('symbols').find({ newDoc }).toArray((err, docs) => {
//     if (err) {
//       handleError(err, err.message, 'Failed to retreive symbol.');
//     }
//     else {
//       res.status(200).json(docs);
//     }
//   });
// });
// app.post('/symbol', (req, res) => {
//   let { newDoc } = req.body;
//   db.collection('symbols').insertOne({ newDoc }, (err, docs) => {
//     if (err) {
//       handleError(err, err.message, 'Failed to save symbol.');
//     }
//     else {
//       res.status(201).json(docs);
//     }
//   });
// });
// TODO: Input socket.io
io.on('connection', (socket) => {
  console.log('User connected');
  socket.emit('test', { hello: 'Hello World!' });
});
// Pass routing to Vue
// Dont run in dev
if (process.env.NODE_ENV !== 'dev') {
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
  });
}
