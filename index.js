var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
require('dotenv').config()

// Environment Variable Defns
app.set('appport', process.env.SERVERPORT || 5000)
app.set('apphost', process.env.SERVERIP || 'localhost')

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/node_modules/angular-smart-table')))

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

module.exports.app = app

// Routes for API
var routes = require('./routes')

// Run server
app.listen(process.env.SERVERPORT)
// app.listen(5000, 'localhost') //Used for testing purposes
