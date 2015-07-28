'use strict';

module.exports = function(app) {
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
