var express = require('express');
var MongoClient = require('mongodb').MongoClient;


var ip = process.env.SERVERIP || 'localhost';
var port = process.env.SERVERPORT || 5000;
var mongo_port      = process.env.MONGODB_SERVICE_PORT_MONGO || 27017;
var mongo_server    = process.env.MONGODB_SERVICE_HOST || '54.71.54.174';
var mongo_dbname    = process.env.MONGODB_DATABASE || 'data';
var mongo_username  = process.env.MONGODB_USERNAME || 'myUserAdmin';
var mongo_pass      = process.env.MONGODB_PASSWD;

// App
var app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n' + JSON.stringify(process.env));
});

app.get('/mongo', function(req, res){
  var connect_url = "mongodb://"+mongo_username+":"+mongo_pass+"@"+mongo_server+":"+mongo_port+"/"+mongo_dbname;
  console.log(connect_url);
  MongoClient.connect(connect_url, function(err, db) {
    if(!err) {
      res.send('Hello mongo');
    } else {
      console.log(err);
    }
  });
});
app.listen(port, ip);
console.log('Running on ' + ip + ':' + port);
