'use strict';

angular.module('myApp.messaging', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/messaging', {
    templateUrl: 'modules/messaging/messaging.html',
    controller: 'ViewmessagingCtrl'
  });
}])

.controller('ViewmessagingCtrl', ['$scope',function($scope) {

}]);