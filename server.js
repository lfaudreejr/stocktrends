import express from 'express';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';

const ObjectID = mongodb.ObjectID;
const mongo = mongodb.MongoClient;

const app = express();

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
  res.send('HELLO');
});
