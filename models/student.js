var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema to store the school information for each recruited university
var studentSchema = new Schema({
  obtainedDate: Date,
  firstName: String,
  lastName: String,
  emailAddress: String,
  phoneNumber: String,
  majorName: String,
  degreeEnrolled: String,
  schoolName: String,
  gradMonth: Number,
  gradYear: Number,
  hasAuthorization: String,
  requiresVisa: String,
  locationPreferences: String,
  skills: String,
  careerInterests: Number,
  positionType: String,
  retcruiterNotes: String,
  amexRecruiterName: String,
  getsInterview: Boolean,
  rating: Number
}, {collection: 'studentData'})

// Assign the schema to the proper data
exports.studentData = mongoose.model('studentData', studentSchema)
