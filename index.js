var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
require('dotenv').config()

// Environment Variable Defns
app.set('appport', process.env.SERVERPORT || 5000)
app.set('apphost', process.env.SERVERIP || 'localhost')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/node_modules/angular-ui-grid')))
app.use(express.static(path.join(__dirname, '/node_modules/angular-smart-table')))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
module.exports.app = app

// Routes for API
var routes = require('./routes')

// Run server
app.listen(process.env.SERVERPORT, process.env.SERVERIP)
