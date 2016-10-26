var mongoose = require('mongoose')
var waterfall = require('async-waterfall')
var studentSchema = require('../models/student')
var commonModules = require('../config/modules')
var atob = require('atob')
var converter = require('json-2-csv')

// Establish database connection
mongoose.createConnection(commonModules.databaseConnectionString)

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

/**
 * Store the new school information into the database
 */
 //TODO: Add resume storing
exports.addStudent = function (req, res) {
  waterfall([
    function (callback) {
      var studentInformation = new studentSchema.studentData
      ({'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'emailAddress': req.body.emailAddress,
        'phoneNumber': req.body.phoneNumber,
        'majorName': req.body.majorName,
        'degreeEnrolled': req.body.degreeEnrolled,
        'schoolName': req.body.schoolName,
        'gradMonth': req.body.gradMonth,
        'gradYear': req.body.gradYear,
        'hasAuthorization': req.body.hasAuthorization,
        'requiresVisa': req.body.requiresVisa,
        'locationPreferences': req.body.locationPreferences,
        'skills': req.body.skills,
        'careerInterests': req.body.careerInterests,
        'positionType': req.body.positionType,
        'retcruiterNotes': req.body.retcruiterNotes,
        'amexRecruiterName': req.body.amexRecruiterName,
        'getsInterview': req.body.getsInterview,
        'rating': req.body.rating,
        'dateAppliedUNIX': 0,
        'dateApplied': req.body.dateObtained
      })
      callback(null, studentInformation)
    }
  ], function (err, studentInformation) {
    studentInformation.save(function (err) {
      if (!err) {
        res
          .status(commonModules.HttpStatus.OK)
          .send('Student Stored')
      }
    })
  })
}
