'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var freezrApp = angular.module('freezrApp', ['ngRoute', 'ngCookies', 'base64']);

//services


//controllers


//directives


//freezrApp route configuration logic
freezrApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/sign_in', {
      templateUrl: 'templates/views/auth.html',
      controller: 'authCtrl'
    });
}])
.run(function($rootScope, $location, auth) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (!auth.isSignedIn()) {
      if (next.$route.templateUrl !== 'templates/views/auth.html') {
        $location.path('/sign_in');
      }
    }
  });
});
