var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema to store the school information for each recruited university
var schoolSchema = new Schema({
  schoolName: String,
  schoolAcronym: String,
  schoolState: String
}, {collection: 'schoolData'})

// Assign the schema to the proper data
exports.schoolData = mongoose.model('schoolData', schoolSchema)
