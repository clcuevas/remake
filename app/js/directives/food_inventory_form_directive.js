'use strict';

module.exports = function(app) {
  app.directive('foodInventoryFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/directives/food_inventory_form.html',
      scope: {
        create: '&',
        buttonText: '=',
        item: '='
      },
      transclude: true
    };
  });
};
