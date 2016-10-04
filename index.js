var express = require('express'),
      http = require('http'),
      path = require('path'),
      app = express(),
      fs = require('fs'),
      dotenv = require('dotenv').config(),
      MongoClient = require('mongodb').MongoClient;

<<<<<<< Updated upstream
// Constants
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var mongo_port = process.env.MONGODB_SERVICE_PORT_MONGO || 27017;
var mongo_server = process.env.MONGODB_SERVICE_HOST || 'localhost';
var mongo_dbname = process.env.MONGODB_DATABASE || 'sampledb';

// App
=======
//Environment Variable Defns
app.set('appport', process.env.SERVERPORT || 5000);
app.set('apphost', process.env.SERVERIP || 'localhost')

>>>>>>> Stashed changes
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< Updated upstream
app.get('/mongo', function(req, res){
  var connect_url = "mongodb://"+mongo_server+":"+mongo_port+"/"+mongo_dbname;
  MongoClient.connect(connect_url, function(err, db) {
    if(!err) {
      console.log("We are connected");
      res.send('Hello mongo');
    }
  });
=======
// Dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  console.log("called");
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
>>>>>>> Stashed changes
});

app.listen(process.env.SERVERPORT, process.env.SERVERIP);
console.log('Running on ' + app.get('appport'));
