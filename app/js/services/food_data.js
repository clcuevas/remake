/*this script will allow food data to be passed around
the app globally without worrying about scopes*/
'use strict';

module.exports = function(app) {
  app.factory('foodData', function() {
    return {
      //store food data in array
      store: [],
      //hold object for global app functionality
      singleFood: null,
      //function that allows food data being passwed around globally
      storeData: function(data) {
        this.store = data;
      }
    };
  });
};
