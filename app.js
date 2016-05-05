'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  
  'myApp.lessons',
  'paginationModule',
  'myApp.auth',
  'myApp.legal',
  'myApp.activities',
  'myApp.housingsale',
  'myApp.creative',
  'myApp.messaging',
  'myApp.students',
  'ngAutocomplete'
  //'ui.bootstrap'
])

.constant('configs', {
  siteUrl: 'lessons'
})

  .config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/lessons'});
}])

.controller('mainController', ['$scope','configs', function($scope,configs) {
        
         $scope.templateUrl = null;

  if (configs.siteUrl === 'lessons') {
    $scope.templateUrl = 'modules/navItems/lessons.html';
  } else if (configs.siteUrl === 'legal') {
    $scope.templateUrl = 'modules/navItems/legal.html';
  } else if (configs.siteUrl === 'activities') {
    $scope.templateUrl = 'modules/navItems/activities.html';
  } else if (configs.siteUrl === 'housingsale') {
    $scope.templateUrl = 'modules/navItems/housingsale.html';
  } else if (configs.siteUrl === 'creative') {
    $scope.templateUrl = 'modules/navItems/creative.html';
  }else if (configs.siteUrl === 'students') {
    $scope.templateUrl = 'modules/navItems/students.html';
  }
  
        
  $scope.loggedInUsersData = null;
  
   //getting the details form localStorage
  var userProfile = localStorage.getItem('userProfile');
  if (userProfile) {
      $scope.loggedInUsersData = JSON.parse(userProfile);
  }
}]);
