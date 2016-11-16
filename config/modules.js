var HttpStatus = require('http-status-codes')
var mongoose = require('mongoose')
var databaseConnectionString = 'mongodb://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWD + '@' + process.env.MONGODB_SERVICE_HOST + ':' + process.env.MONGODB_SERVICE_PORT_MONGO + '/' + process.env.MONGODB_DATABASE
//var databaseConnectionString = '127.0.0.1:27017/amexRecruiting' //Used for testing purposes

module.exports = {
  HttpStatus: HttpStatus,
  mongoose: mongoose,
  databaseConnectionString: databaseConnectionString
}
