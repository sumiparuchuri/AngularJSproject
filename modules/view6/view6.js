'use strict';

angular.module('myApp.view6', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view6', {
    templateUrl: 'modules/view6/view6.html',
    controller: 'View6Ctrl'
  });
}])

.controller('View6Ctrl', ['$scope',function($scope) {

}]);