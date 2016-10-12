var mongoose = require('mongoose')
var waterfall = require('async-waterfall')
var studentSchema = require('../models/school')
var commonModules = require('../config/modules')

// Establish database connection
mongoose.connect(commonModules.databaseConnectionString)

module.exports.controller = function (app) {
/**
 * Bring down the list of most up-to-date schools in the database
 */
  app.get('/getStudents/', function (req, res) {
    waterfall([
      function (callback) {
        var school = req.param('school')
        var fromDate = req.param('from')
        var toDate = req.param('to')
        if (toDate != null && fromDate != null) {
          if (school != null) {
            studentSchema.studentData.find({'schoolName': school, 'obtainedDate': {$gte: toDate, $lt: fromDate}}, {_id: 0}, function (err, serverDbData) {
              if (err) {
                res
                  .status(commonModules.HttpStatus.INTERNAL_SERVER_ERROR)
                  .send(err)
              }
              callback(null, serverDbData, 'done')
            })
          } else {
            studentSchema.studentData.find({'obtainedDate': {$gte: toDate, $lt: fromDate}}, {_id: 0}, function (err, serverDbData) {
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
  })

  /**
   * Store the new school information into the database
   */
  app.post('/addStudent', function (req, res) {
    for (var obj in req.body) {
      waterfall([
        function (callback) {
          var studentInformation = new studentSchema.studentData
          ({'obtainedDate': obj.obtainedDate,
            'firstName': obj.firstName,
            'lastName': obj.lastName,
            'emailAddress': obj.emailAddress,
            'phoneNumber': obj.phoneNumber,
            'majorName': obj.majorName,
            'degreeEnrolled': obj.degreeEnrolled,
            'schoolName': obj.schoolName,
            'gradMonth': obj.gradMonth,
            'gradYear': obj.gradYear,
            'hasAuthorization': obj.hasAuthorization,
            'requiresVisa': obj.requiresVisa,
            'locationPreferences': obj.locationPreferences,
            'skills': obj.skills,
            'careerInterests': obj.careerInterests,
            'positionType': obj.positionType,
            'retcruiterNotes': obj.retcruiterNotes,
            'amexRecruiterName': obj.amexRecruiterName,
            'getsInterview': obj.getsInterview,
            'rating': obj.rating})
          callback(null, studentInformation, 'done')
        }
      ], function (err, studentInformation, result) {
        studentInformation.save(function (err) {
          if (!err) {
            res
              .status(commonModules.HttpStatus.OK)
              .send('Student Stored')
          }
        })
      })
    }
  })
}
