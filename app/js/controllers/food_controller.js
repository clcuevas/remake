'use strict';

module.exports = function(app) {
  app.controller('foodController', ['$scope', '$location', '$cookies', 'RESTResource', 'foodData', function($scope, $location, $cookies, resource, foodData) {
    var Item = resource('food_items');
    $scope.showThisForm = false;

    //hold errors during rendering
    $scope.errors = [];
    //hold food items from the server
    $scope.allItems = [];
    //hold only items we want to display
    $scope.displayedItems = [];

    //grab obj clicked on and store to food data service
    $scope.singleFood = foodData.singleFood;

    $scope.saveSingleFood = function(thisItem) {
      $cookies.putObject('singleFood', foodData.store.filter(function(item) {
        return item._id === thisItem._id;
      }));

      //single food item path using singFoodController
      $location.path('/item');
    };

    $scope.toggleForm = function() {
      if ($scope.showThisForm) {
        return $scope.showThisForm = false;
      } else {
        return $scope.showThisForm = true;
      }
    };

    //grab all food items and place them into foodData array
    $scope.getAll = function(callback) {
      Item.getAll(function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'error retrieving food items'});
        }

        foodData.storeData(data);
        callback(foodData.store);
      });
    };

    //assign expiration date to items
    $scope.addDaysProperty = function(arr) {
      arr.forEach(function(item) {
        var thisDate = new Date(item.exp);
        item.days = Math.round((thisDate.getTime() - Date.now()) / 86400000);
      });
    };

    $scope.getDisplayedItems = function(num, start) {
      $scope.getAll(function(arr) {
        var thisStart = 0;

        if (start) {
          thisStart = start;
        }

        $scope.displayedItems = arr.slice(thisStart, num);
        $scope.addDaysProperty($scope.displayedItems);
      });
    };

    $scope.getDisplayedItems(15);

    $scope.createNewItem = function(item) {
      //insert imageURL to item obj depending on itemType
      $scope.populateImages(item);

      var newItem = item;
      item = null;

      $scope.displayedItems.push(newItem);
      $scope.addDaysProperty($scope.displayedItems);
      foodData.store.push(newItem);

      Item.create(newItem, function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not save item: ' + newItem.itemID});
        }

        $scope.displayedItems.splice($scope.displayedItems.indexOf(newItem), 1, data);
        foodData.store.splice(foodData.store.indexOf(newItem), 1, data);
      });

      //hide form after successfully creating new item
      $scope.showThisForm = false;
    };

    $scope.removeItem = function(item) {
      $scope.displayedItems.splice($scope.displayedItems.indexOf(item), 1);

      Item.remove(item, function(err) {
        if (err) {
          return $scope.errors.push({msg: 'could not remove item: ' + item});
        }
      });
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };

    /*
      This function populates images for itemType user
      selects upon creating/ adding a new food item.
      This is subject to change if time allows to give
      the user the option to upload their own image.
    */

    //BELOW IMAGES NEED TO BE SAVED AND ADDED TO PROJECT UNDER lib/img

    $scope.populateImages = function(item) {
      console.log('populate images function');
      if (item.itemType == 'vegetable') {
        item.imageURL = 'img/vegetable.jpg';
      }

      if (item.itemType == 'fruit') {
        item.imageURL = 'img/fruit.jpg';
      }

      if (item.itemType == 'meat') {
        item.imageURL = 'img/meat.jpg';
      }

      if (item.itemType == 'dairy') {
        item.imageURL = 'img/dairy.jpg';
      }

      if (item.itemType == 'fish') {
        item.imageURL = 'img/fish.jpg';
      }
    };

  }]);
};
