'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var freezrApp = angular.module('freezrApp', ['ngRoute', 'ngCookies', 'base64']);

//services
require('./auth/services/auth_service.js')(freezrApp);
require('./services/copy.js')(freezrApp);
require('./services/food_data.js')(freezrApp);
require('./services/rest_resource.js')(freezrApp);

//controllers
require('./auth/controllers/auth_controller.js')(freezrApp);
require('./controllers/food_controller.js')(freezrApp);
require('./controllers/single_food_item_controller.js')(freezrApp);

//directives
require('./auth/directives/sign_in_directive.js')(freezrApp);
require('./auth/directives/log_out_directive.js')(freezrApp);
require('./auth/directives/display_user_directive.js')(freezrApp);
require('./auth/directives/create_user_directive.js')(freezrApp);
require('./directives/header_directive.js')(freezrApp);
require('./directives/food_inventory_form_directive.js')(freezrApp);
require('./directives/single_food_form_directive.js')(freezrApp);

//freezrApp route configuration logic
freezrApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/sign_in', {
      templateUrl: 'templates/views/authentication.html',
      controller: 'authController'
    })
    .when('/create_user', {
      templateUrl: 'templates/views/authentication.html',
      controller: 'authController'
    })
    .when('/homepage', {
      templateUrl: 'templates/views/homepage.html',
      controller: 'foodController'
    })
    .when('/item', {
      templateUrl: 'templates/views/single_food_item.html',
      controller: 'singleFoodController'
    })
    .otherwise({
      redirectTo: '/create_user'
    });
}])
.run(function($rootScope, $location, auth) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (!auth.isSignedIn()) {
      if (next.$route.templateUrl !== 'templates/views/authentication.html') {
        $location.path('/sign_in');
      }
    }
  });
});
