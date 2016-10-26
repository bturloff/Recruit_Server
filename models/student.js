var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema to store the school information for each recruited university
var studentSchema = new Schema({
  studentName: String,
  schoolName: String,
  dateAppliedUNIX: Number,
  dateApplied: String
}, {collection: 'students'})

// Assign the schema to the proper data
exports.studentData = mongoose.model('students', studentSchema)
