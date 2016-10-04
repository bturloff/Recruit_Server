var express = require('express'),
      http = require('http'),
      path = require('path'),
      app = express(),
      fs = require('fs'),
      dotenv = require('dotenv').config(),
      MongoClient = require('mongodb').MongoClient;

//Environment Variable Defns
app.set('appport', process.env.SERVERPORT || 5000);
app.set('apphost', process.env.SERVERIP || 'localhost')

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  console.log("called");
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

app.listen(process.env.SERVERPORT, process.env.SERVERIP);
console.log('Running on ' + app.get('appport'));
