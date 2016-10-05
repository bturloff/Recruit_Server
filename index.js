var express = require('express')
var path = require('path')
var app = express()
var fs = require('fs')
var bodyParser = require('body-parser')
require('dotenv').config()

// Environment Variable Defns
app.set('appport', process.env.SERVERPORT || 5000)
app.set('apphost', process.env.SERVERIP || 'localhost')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if (file.substr(-3) === '.js') {
    var route = require('./controllers/' + file)
    route.controller(app)
  }
})

app.listen(process.env.SERVERPORT, process.env.SERVERIP)
