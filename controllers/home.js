var mongoose = require('mongoose')
var waterfall = require('async-waterfall')
var schoolSchema = require('../models/school')
var commonModules = require('../config/modules')

/**
 * Render the home page for data export to the user on the front-end
 */

exports.index = function (req, res) {
  res.render('../public/index.html')
}
