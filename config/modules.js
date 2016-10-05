var HttpStatus = require('http-status-codes')
var mongoose = require('mongoose')
var databaseConnectionString = 'mongodb://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWD + '@' + process.env.MONGODB_SERVICE_HOST + ':' + process.env.MONGODB_SERVICE_PORT_MONGO + '/' + process.env.MONGODB_DATABASE

module.exports = {
  HttpStatus: HttpStatus,
  mongoose: mongoose,
  databaseConnectionString: databaseConnectionString
}
