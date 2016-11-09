var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema to store the school information for each recruited university
var studentSchema = new Schema({
  studentName: String,
  schoolName: String,
  dateAppliedUNIX: String,
  dateApplied: String,
  firstName: String,
  lastName: String,
  emailAddress: String,
  phoneNumber: String,
  majorName: String,
  degreeEnrolled: String,
  gradMonth: String,
  gradYear: String,
  hasAuthorization: String,
  requiresVisa: String,
  locationPreferences: String,
  skills: String,
  careerInterests: String,
  positionType: String,
  recruiterNotes: String,
  amexRecruiterName: String,
  getsInterview: String,
  rating: String
}, {collection: 'students'})

// Assign the schema to the proper data
exports.studentData = mongoose.model('students', studentSchema)
