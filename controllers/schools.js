var mongoose            = require('mongoose')
var waterfall           = require('async-waterfall');
var schoolSchema        = require('../models/school');
mongoose.connect("mongodb://"+process.env.MONGODB_USERNAME+":"+process.env.MONGODB_PASSWD+"@"+process.env.MONGODB_SERVICE_HOST+":"+process.env.MONGODB_SERVICE_PORT_MONGO+"/"+process.env.MONGODB_DATABASE);

module.exports.controller = function(app) {

/**
 * Bring down the list of most up-to-date schools in the database
 */
  app.get('/schools', function(req, res) {

    waterfall([
      function(callback){

        //Pull the data from remote mongo server
        schoolSchema.schoolData.find({}, function(err, serverDbData) {
          console.log(serverDbData);
          callback(null, serverDbData, 'done');
        })
      },
    ], function (err, schoolInformationData, result) {

        //Send the queried JSON from DB back to Angular controller
        res.json(schoolInformationData);
    });
  });
}

/*
*Will Deal with this when we store school data into the remote DB
*/
// exports.storeSchool = function(req, res) {
//
//   var schoolData = new schoolSchema({ schoolName: req.body.schoolName, schoolAcronym: req.body.schoolAcronym, schoolState: req.body.schoolState});
//   schoolData.save(function(err) {
//     if (!err) {
//       console.log("Data saved into the database successfully!");
//     } else {
//       console.log(!err);
//     }
//   });
// };
