'use strict';

module.exports = function(app) {
  app.directive('foodInventoryFoodDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/directives/food_inventory_form.html',
      scope: {},
      transclude: true
    };
  });

  app.directive('singleFoodItemEditDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/directives/single_food_item_edit_form.html',
      scope: {
        save: '&',
        buttonText: '=',
        item: '='
      },
      transclude: true
    };
  });
};
