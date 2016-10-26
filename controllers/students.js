var mongoose = require('mongoose')
var waterfall = require('async-waterfall')
var studentSchema = require('../models/student')
var commonModules = require('../config/modules')
var atob = require('atob')
var converter = require('json-2-csv')

// Establish database connection
mongoose.createConnection(commonModules.databaseConnectionString)

/**
 * Handle the student CSV export functonality
 * Takes in a ROT64 encrypted string to parse and query the database
 */
exports.getStudents = function (req, res) {
  waterfall(
    [
      function (callback) {
        // Split the user data by the delimiter from the query

        console.log("THIS GOT CALLED ")

        callback(null, atob(req.params.processingInformation).split('$'))
      },
      function (serverDbData, callback) {
        console.log(serverDbData)
        studentSchema.studentData.find({'dateApplied': {'$gte': parseInt(serverDbData[1]), '$lte': parseInt(serverDbData[2])}}, '-_id', function (err, serverDbData) {
          if (err) {
            res
              .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
              .send(err)
          }
          callback(err, serverDbData)
        })
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
        trimFieldValues:  true,
        keys             : ['studentName', 'schoolName', 'dateApplied']
      }

      var json2csvCallback = function (err, csv) {
        if (err) throw err

        res.set({'Content-Disposition': 'attachment; filename=student-recruits.csv', 'Set-Cookie': 'fileDownload=true; path=/'})
        res
          .status(commonModules.HttpStatus.OK)
          .send(csv)
      }

      if (queriedStudentData.length != 0) {
        converter.json2csv(queriedStudentData[0], json2csvCallback, options)
      } else {
        res
          .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
          .send(err)
      }
    }
  )
}
