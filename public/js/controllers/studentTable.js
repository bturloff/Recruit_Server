// var mongoose = require('mongoose')


// Define the `recruitingApp` module
var recruitingApp = angular.module('recruitingApp',['smart-table']);

// Define the `RecruitingTableController` controller on the `phonecatApp` module
recruitingApp.controller('studentTableController', ['$scope', function ($scope) {

  $.ajax({

      // The URL for the request
      url: "http://" + window.location.hostname + ":" + location.port + "/getStudentsJson",

      // Whether this is a POST or GET request
      type: "GET",

      // The type of data we expect back
      dataType : "json",
  })
    // Code to run if the request succeeds (is done);
    // The response is passed to the function
    .done(function( students ) {
      console.log(students);
      $scope.students = students;
      $scope.$apply();
      students.forEach(function(student) {
        console.log(student.studentName);
      });
    })
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    .fail(function( xhr, status, errorThrown ) {
      alert( "Sorry, there was a problem!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    });


    $scope.selectPosition = function (student, school, date, major, visa, interests) {
      console.log(student, school, date)
      $('#student_name').text(student);
      $('#school_name').text(school);
      $('#date_applied').text(date);
      $('#major').text(major);
      $('#visa').text(visa);
      if(visa == "Yes"){
        $('#visa').addClass("label label-danger");
        $('#visa').removeClass("label-success");
      }
      else{
        $('#visa').addClass("label label-success");
        $('#visa').removeClass("label-danger");
      }
      $('#interests').text(interests);
    }

}]);


$(document).ready(function(){


});
