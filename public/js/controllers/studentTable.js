


// Define the `phonecatApp` module
var phonecatApp = angular.module('recruitingApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('studentTableController', function studentTableController($scope) {
  $scope.students = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];
});
