'use strict';

module.exports = function(app) {
  app.directive('searchBarDirective', function() {
    return {
      restrict: 'A',
      replace: false,
      templateUrl: '/templates/directives/search_bar.html',
      scope: {}
    };
  });
};
