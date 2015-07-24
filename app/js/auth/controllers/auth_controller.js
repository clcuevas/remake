'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'auth', function($scope, $location, auth) {
    //An array for authentication tabs
    $scope.tabs = [{
      title: 'Create User',
      url: '../templates/directives/create_user.html'
    },
    {
      title: 'Sign In',
      url: '../templates/directives/sign_in.html'
    }];

    $scope.currentTab = '../templates/directives/sign_in.html';

    $scope.onClickTab = function(tab) {
      $scope.currentTab = tab.url;
    };

    $scope.isActiveTab = function(tabUrl) {
      return tabUrl === $scope.currentTab;
    };

    //if user is signed in, direct to home page
    if (auth.isSignedIn()) {
      $location.path('/homepage');
    }

    //if user is not signed in, direct to sign in page
    if (!auth.isSignedIn()) {
      $location.path('/sign_in');
    }

    //hold controller errors in array
    $scope.errors = [];

    $scope.authSubmit = function(user) {
      if (user.password_conf) {
        if (user.password !== user.password_conf) {
          return window.alert('Your password and confirmation do not match!');
        }

        auth.create(user, function(err) {
          if (err) {
            console.log(err);
            return $scope.errors.push({msg: 'Could not sign in'});
          }

          $location.path('/homepage');
        });
      } else {
        auth.signIn(user, function(err) {
          if (err) {
            console.log(err);
            return $scope.errors.push({msg: 'Could not sign in'});
          }

          $location.path('/homepage');
        });
      }
    };

  }]);
};
