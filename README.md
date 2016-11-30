<div style="text-align:center"><img src ="https://icm.aexp-static.com/Internet/NGMS/US_en//Images/popstore/Amex-one-color-300x300.jpg" /></div>

#Dev Quickstart
Simply `git clone https://github.com/tchapi/markdown-cheatsheet.git` into a directory of your choosing on your local machine. Once this is complete, you are ready to install the required modules. The modules can be installed onto the system by running `npm install`. This will load everything locally onto the system.

```
It's important to note that all devs must have a .env file loaded into the root dir of this project for it to run and connect properly. This .env can be obtained by the administrator. The .env contains all the private access tokens for connecting to the secure data such as the mongo db for the student store data
```

#Running Unit Tests
The unit testing framework currently set is Mocha. The test alias is defined in the `package.json`. As you can see in the file, the alias to run the tests is as follows: `npm test`. This will ensure the entire codebase is passing as you continuously write new code.


#Overall Structure

The application for the backend server is broken up into the following structure as seen below:

### Config ###
The modules file within the config contains the universal database connection that can be derived from the .env file loaded at runtime. This environment variable file can be obtained by the adminsistrator of the application.

### Controllers ###
The business logic for handling the processing of each end-point is housed within the controllers directory. This directory currently processes database queries from the client for schools info, the students info and the front-end UI.

### Models ###
In order to store the proper information in the Mongo database, the models are currently setup to store the school data and student data as seend in the models/\*.js files. These define a clean structure that every object must persist into the DB.

### Package.JSON ###
As listed in the DEV setup above, the JSON contains a simple list of all the required modules for the application. A simple npm install will load these up onto the dev system.

### Public ###
Contains all the CSS/HTML for the frontend prototype.

### Tests ###
Currently, unit tests have been made for several of the API calls in the system. It is recommended to add additional unit tests as the code is progressed to ensure resiliency within the code.

```
├── README.md
├── config
│   └── modules.js
├── controllers
│   ├── home.js
│   ├── schools.js
│   └── students.js
├── dist
├── gulpfile.js
├── index.js
├── models
│   ├── school.js
│   └── student.js
├── package.json
├── public
│   ├── css
│   │   ├── bootstrap.css
│   │   ├── bootstrap.min.css
│   │   ├── component.css
│   │   ├── default.css
│   │   └── errors.css
│   ├── fonts
│   │   ├── codropsicons
│   │   │   ├── codropsicons.eot
│   │   │   ├── codropsicons.svg
│   │   │   ├── codropsicons.ttf
│   │   │   ├── codropsicons.woff
│   │   │   └── license.txt
│   │   ├── glyphicons-halflings-regular.eot
│   │   ├── glyphicons-halflings-regular.svg
│   │   ├── glyphicons-halflings-regular.ttf
│   │   ├── glyphicons-halflings-regular.woff
│   │   ├── glyphicons-halflings-regular.woff2
│   │   └── nlicons
│   │       ├── license.txt
│   │       ├── nlicons.dev.svg
│   │       ├── nlicons.eot
│   │       ├── nlicons.svg
│   │       ├── nlicons.ttf
│   │       └── nlicons.woff
│   ├── index.html
│   └── js
│       ├── bootstrap.js
│       ├── bootstrap.min.js
│       ├── csv_export.js
│       ├── form_validation.js
│       ├── jquery.js
│       ├── js_dl.js
│       ├── load_defaults.js
│       ├── modernizr.custom.js
│       └── nlform.js
├── routes.js
└── test
    ├── school_tests.js
        └── student_tests.js
```        
