const
  express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  app = express(),
  helmet = require('helmet'),
  compression = require('compression'),
  cors = require('cors'),
  path = require('path'),
  mongoClient = require('mongodb').MongoClient,
  crypto = require('crypto');
//------------------------------------------------------------------------------
const port = process.env.PORT || '5001';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
//------------------------------------------------------------------------------
//const url = 'mongodb://localhost:27017';
const url = 'mongodb://172.18.200.11:27017';
const dbName = 'doctor';
//------------------------------------------------------------------------------
app.use(function (req, res, next) {
  res.header('Access-Control-Expose-Headers', 's-token, Authorization');
  next();
});
app
  .use(bodyParser.json({ limit: '50mb' }))
  .use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
  .use(compression())
  .use(helmet())
  .use(cors())
//------------------------------------------------------------------------------  
mongoClient.connect(url,{ useNewUrlParser: true }, function (err, client) {
  console.log("Connected successfully rverto server");
  const db = client.db(dbName);
  app.db = db;
});
//---------------------------------------------------------------
app.get('/api/currentDate', (req, res) => {
  res.send(new Date());
});
//---------------------------------------------------------------
var zaraban_init = require('./zaraban.init');

app.use('/api/zaraban_init', zaraban_init);
//===============================================================

