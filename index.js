var express = require('express');
var MongoClient = require('mongodb').MongoClient;

// Constants
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var mongo_port = process.env.MONGODB_SERVICE_PORT_MONGO || 27017;
var mongo_server = process.env.MONGODB_SERVICE_HOST || 'localhost';
var mongo_dbname = process.env.MONGODB_DATABASE || 'sampledb';

// App
var app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n' + JSON.stringify(process.env));
});

app.get('/mongo', function(req, res){
  var connect_url = "mongodb://"+mongo_server+":"+mongo_port+"/"+mongo_dbname;
  MongoClient.connect(connect_url, function(err, db) {
    if(!err) {
      console.log("We are connected");
      res.send('Hello mongo');
    }
  });
});
app.listen(port, ip);
console.log('Running on ' + ip + ':' + port);
