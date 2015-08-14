'use strict';

module.exports = function(app) {
  app.directive('modalDialog', function() {
    return {
      restrict: 'E',
      replace: true,  //replace with template below
      scope: {
        show: '='
      },
      transclude: true, //insert custom content inside directive
      link: function(scope, element, attrs) {
        scope.dialogStyle = {};

        if (attrs.width) {
          scope.dialogStyle.width = attrs.width;
        }

        if (attrs.height) {
          scope.dialogStyle.height = attrs.height;
        }

        scope.hideModal = function() {
          scope.show = false;
        };
      },
      templateUrl: '/templates/directives/dialog_box.html'
    };
  });
};
