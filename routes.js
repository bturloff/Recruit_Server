
 /*
  * Map routes to functions from controller classes
  */
var main = require('./index.js')
var siteController = require('./controllers/home')
var studentController = require('./controllers/students')
var schoolsController = require('./controllers/schools')

 /*
  * GET Methods
  */
main.app.get('/', siteController.index)
main.app.get('/getSchools', schoolsController.getSchools)
main.app.get('/getStudents/:processingInformation', studentController.getStudents)

 /*
  * POST Methods
  */
main.app.post('/addSchool', schoolsController.addSchool)
main.app.post('/addStudent', studentController.storeStudent)
