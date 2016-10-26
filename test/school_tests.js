var supertest = require("supertest");
var should = require("should");
var app = require('../index');

describe("Schools Controller Test",function(){

  it("Should return school JSON information",function(done){

    // calling home page api
    supertest(app.app)
    .get("/getSchools/")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.body[0].hasOwnProperty('schoolName').should.equal(true)
      res.status.should.equal(200);
      done();
    });
  });

  it("Should return the abbreviation for school",function(done){

    // calling home page api
    supertest(app.app)
    .get("/getSchools/")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.body[0].hasOwnProperty('schoolAcronym').should.equal(true)
      res.status.should.equal(200);
      done();
    });
  });

  it("Should return the state for school",function(done){

    // calling home page api
    supertest(app.app)
    .get("/getSchools/")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.body[0].hasOwnProperty('schoolState').should.equal(true)
      res.status.should.equal(200);
      done();
    });
  });

});
