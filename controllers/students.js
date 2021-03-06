var mongoose = require('mongoose')
var waterfall = require('async-waterfall')
var studentSchema = require('../models/student')
var commonModules = require('../config/modules')
var atob = require('atob')
var converter = require('json-2-csv')

// Establish database connection
mongoose.createConnection(commonModules.databaseConnectionString)


/**
 * Gets the exact student JSON data
 * Returns all the students in JSON format
 */
exports.getStudentJSON = function(req, res) {

  waterfall([
        function (callback) {
          var school = req.param('school')
          var fromDate = req.param('from')
          var toDate = req.param('to')
          if (toDate != null && fromDate != null) {
            if (school != null) {
              studentSchema.studentData.find({'schoolName': school, 'dateAppliedUNIX': {$gte: toDate, $lt: fromDate}}, {_id: 0}, function (err, serverDbData) {
                if (err) {
                  res
                    .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
                    .send(err)
                }
                callback(null, serverDbData, 'done')
              })
            } else {
              studentSchema.studentData.find({'dateAppliedUNIX': {$gte: toDate, $lt: fromDate}}, {_id: 0}, function (err, serverDbData) {
                if (err) {
                  res
                    .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
                    .send(err)
                }
                callback(null, serverDbData, 'done')
              })
            }
          } else if (school != null) {
            studentSchema.studentData.find({'schoolName': school}, {_id: 0}, function (err, serverDbData) {
              if (err) {
                res
                  .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
                  .send(err)
              }
              callback(null, serverDbData, 'done')
            })
          } else {
            studentSchema.studentData.find({_id: 0}, function (err, serverDbData) {
              if (err) {
                res
                  .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
                  .send(err)
              }
              callback(null, serverDbData, 'done')
            })
          }
        }
      ], function (err, studentInformationData, result) {
        if (err) {
          res
            .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
            .send(err)
        }

        res.json(studentInformationData)
      })
}


/**
 * Store a specific student into the database
 * Adds the student json from xamarin into the server
 */
exports.storeStudent = function (req, res) {
    waterfall([
      function (callback) {
        var studentInformation = new studentSchema.studentData
        ({"studentName": req.body.studentName,
          "schoolName": req.body.schoolName,
          "dateAppliedUNIX": String(req.body.dateObtained),
          "dateApplied": req.body.dateApplied,
          "firstName": req.body.firstName,
          "lastName": req.body.lastName,
          "emailAddress": req.body.emailAddress,
          "phoneNumber": req.body.phoneNumber,
          "majorName": req.body.majorName,
          "degreeEnrolled": req.body.degreeEnrolled,
          "gradMonth": req.body.gradMonth,
          "gradYear": req.body.gradYear,
          "hasAuthorization": req.body.hasAuthorization,
          "requiresVisa": req.body.requiresVisa,
          "locationPreferences": req.body.locationPreferences,
          "skills": req.body.skills,
          "careerInterests": req.body.careerInterests,
          "positionType": req.body.positionType,
          "recruiterNotes": req.body.recruiterNotes,
          "amexRecruiterName": req.body.amexRecruiterName,
          "getsInterview": req.body.getsInterview,
          "rating": req.body.rating,
          "resumeImage1": req.body.resumeImage1,
          "resumeImage2": req.body.resumeImage2
        })
        callback(null, studentInformation, req.body.id)
      }
    ], function (err, studentInformation, result) {
      studentInformation.save(function (err) {
        if (!err) {
          res
            .status(commonModules.HttpStatus.OK)
            .send(String(result))
        }
        else {
          res
            .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
            .send(err)
        }
      })
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

exports.getStudentsJson = function (req, res) {

  var studentsJson = studentSchema.studentData.find().lean().exec(function(err, docs) {    
    if (err) throw error;
    res.status(commonModules.HttpStatus.OK)
              .send(docs);
  });
}
