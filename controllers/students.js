var mongoose = require('mongoose')
var waterfall = require('async-waterfall')
var studentSchema = require('../models/student')
var commonModules = require('../config/modules')
var atob = require('atob')
var converter = require('json-2-csv')

// Establish database connection
mongoose.createConnection(commonModules.databaseConnectionString)

/**
 * Outputs individual student JSON data for angular table info
 */
exports.getStudentBio = function (req, res) {
  // Primary key that will be used to uniquely identify student
  var studentID = req.params.studentID

  waterfall(
    [
      function (callback) {
        studentSchema.studentData.find({'studentID': studentID}, '-_id', function (err, serverDbData) {
          if (err) {
            return res
              .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
              .send('Query processing problem')
          } else {
            callback(null, serverDbData, 'done')
          }
        })
      }
    ],
    function (err, queriedStudentData) {
      if (!err) {
        res.send(queriedStudentData)
      }
    })
}

/**
 * Handle the student CSV export functonal`ity
 * Takes in a ROT64 encrypted string to parse and query the database
 */
exports.getStudents = function (req, res) {
  waterfall(
    [
      function (callback) {
        // Get the encoded string passed in and parse the school name
        var serverDbData = atob(req.params.processingInformation).split('$')

        //Handle invalid encoded strings
        if (serverDbData.length !== 3) {
          return res
            .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
            .send('Invalid query string')
        }

        var schoolName = serverDbData[0].toLowerCase();

        if (serverDbData[1] <= serverDbData[2]) {
          if (schoolName == 'all schools') {
            studentSchema.studentData.find({'dateAppliedUNIX': {'$gte': parseInt(serverDbData[1]), '$lte': parseInt(serverDbData[2])}}, '-_id', function (err, serverDbData) {
              if (err) {
                res
                  .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
                  .send(err)
              }
              callback(null, serverDbData, 'done')
            })
          } else {
            studentSchema.studentData.find({'dateAppliedUNIX': {'$gte': parseInt(serverDbData[1]), '$lte': parseInt(serverDbData[2])}, 'schoolName': serverDbData[0]}, '-_id', function (err, serverDbData) {
              if (err) {
                res
                  .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
                  .send(err)
              }
              callback(null, serverDbData, 'done')
            })
          }
        } else {
          res
            .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
            .send('Invalid date range')
        }
      }
    ],
    function (err, queriedStudentData) {
      if (err) throw err

      var options = {
        delimiter : {
          wrap  : '"', // Double Quote (") character
          field : ',', // Comma field delimiter
          array : ';', // Semicolon array value delimiter
          eol   : '\n' // Newline delimiter
        },
        prependHeader: true,
        sortHeader: false,
        trimHeaderValues: true,
        trimFieldValues: true,
        keys: ['studentName', 'schoolName', 'dateApplied']
      }

      var json2csvCallback = function (err, csv) {
        if (err) throw err
        res.set({'Content-Disposition': 'attachment; filename=student-recruits.csv', 'Set-Cookie': 'fileDownload=true; path=/', 'Download-Successful': 'True'})
        res
          .status(commonModules.HttpStatus.OK)
          .send(csv)
      }

      if (queriedStudentData.length !== 0) {
        converter.json2csv(queriedStudentData, json2csvCallback, options)
      } else {
        res
          .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
          .send(err)
      }
    }
  )
}
