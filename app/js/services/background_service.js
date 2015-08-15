'use strict';

module.exports = function(app) {
  app.factory('BackgroundService', [function() {
    var currentBackgroundClass = 'home-bg';

    return {
      setCurrentBg: function(pageClass) {
        currentBackgroundClass = pageClass;
      },
      getCurrentBg: function() {
        return currentBackgroundClass;
      }
    };
  }]);
};
