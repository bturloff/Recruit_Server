var mongoose = require('mongoose')
var waterfall = require('async-waterfall')
var schoolSchema = require('../models/school')
var commonModules = require('../config/modules')


module.exports.controller = function (app) {
/**
 * Render the home page for data export to the user on the front-end
 */
  app.get('/', function (req, res) {
    res.render('../public/index.html')
  })
}
