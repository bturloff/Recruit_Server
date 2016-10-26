var supertest = require("supertest");
var should = require("should");
var app = require('../index');

describe("Students Controller Test",function(){

  it("should fail on invalid date range",function(done){

    // calling home page api
    supertest(app.app)
    .get("/getStudents/YWxsIHNjaG9vbHMkMTU0MDUzNzIwMCQxNDc3NDY1MjAw")
    .expect("Content-type",/json/)
    .expect(500)
    .end(function(err,res){
      res.text.should.equal('Invalid date range')
      res.status.should.equal(500);
      done();
    });
  });

  it("should return 200 on valid export",function(done){

    // calling home page api
    supertest(app.app)
    .get("/getStudents/YWxsIHNjaG9vbHMkMTQ1MTYzMTYwMCQxNDc3NDY1MjAw")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.header['download-successful'].should.equal('True')
      res.status.should.equal(200);
      done();
    });
  });

  it("should return 404 on invalid url param",function(done){

    // calling home page api
    supertest(app.app)
    .get("/getStudents/")
    .expect("Content-type",/json/)
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  });

  it("should return 500 on invalid encoded URL and output error",function(done){

    // calling home page api
    supertest(app.app)
    .get("/getStudents/INVALIDSTRING")
    .expect("Content-type",/json/)
    .expect(500)
    .end(function(err,res){
      res.status.should.equal(500);
      done();
    });
  });


});
