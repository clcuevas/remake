'use strict';

module.exports = function(app) {
  app.directive('displayUserDirective', ['$rootScope', '$cookies', function($rootScope, $cookies) {
    return {
      restrict: 'AC',
      replace: false,
      scope: {},
      template: '<div class="username" data-ng-if="signedIn()"><p>Welcome <strong>{{displayUsername()}}<strong> !</p></div>',
      controller: ['$scope', '$location', 'auth',
        function($scope, $location, auth) {
          $scope.signedIn = function() {
            return auth.isSignedIn();
          };

          $scope.displayUsername = function() {
            return $cookies.get('username').toUpperCase();
          };
        }]
    };
  }]);
};
