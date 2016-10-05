var mongoose = require('mongoose')
var waterfall = require('async-waterfall')
var schoolSchema = require('../models/school')
var commonModules = require('../config/modules')

// Establish database connection
mongoose.connect(commonModules.databaseConnectionString)

module.exports.controller = function (app) {
/**
 * Bring down the list of most up-to-date schools in the database
 */
  app.get('/getSchools', function (req, res) {
    waterfall([
      function (callback) {
        schoolSchema.schoolData.find({}, {_id: 0}, function (err, serverDbData) {
          if (err) {
            res
              .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
              .send(err)
          }
          callback(null, serverDbData, 'done')
        })
      }
    ], function (err, schoolInformationData, result) {
      if (err) {
        res
          .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
          .send(err)
      }

      res.json(schoolInformationData)
    })
  })

  /**
   * Store the new school information into the database
   */
  app.post('/addSchool/', function (req, res) {
    waterfall([
      function (callback) {
        var schoolInformation = new schoolSchema.schoolData({ 'schoolName': req.body.schoolName, 'schoolAcronym': req.body.schoolAcronym, 'schoolState': req.body.schoolState })
        callback(null, schoolInformation, 'done')
      }
    ], function (err, schoolInformation, result) {
      schoolInformation.save(function (err) {
        if (!err) {
          res
            .status(commonModules.HttpStatus.OK)
            .send('School Stored')
        }
      })
    })
  })
}
