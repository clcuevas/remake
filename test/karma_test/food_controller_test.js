'use strict';

require('../../app/js/client.js');
require('angular-mocks');

describe('food controller', function() {
  var $ControllerConstructor;
  var $scope;
  var $location;
  var $cookies;
  var foodData;
  var fakeData = {_id: 'myId'};
  var fakeStoreData = [
    {
      _id: 'myId',
      name: 'myName'
    },
    {
      _id: 'fakeId',
      name: 'fakeName'
    }
  ];

  beforeEach(angular.mock.module('freezrApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a new controller', function() {
    //the $scope assignment sets your $scope declaration as an actual $rootScope
    var foodController = $ControllerConstructor('foodController', {$scope: $scope});

    expect(typeof foodController).toBe('object');
    expect(Array.isArray($scope.allItems)).toBe(true);
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(Array.isArray($scope.displayedItems)).toBe(true);
    expect(typeof $scope.saveSingleFood).toBe('function');
    expect(typeof $scope.toggleForm).toBe('function');
    expect(typeof $scope.getAll).toBe('function');
    expect(typeof $scope.addDaysProperty).toBe('function');
    expect(typeof $scope.getDisplayedItems).toBe('function');
    expect(typeof $scope.createNewItem).toBe('function');
    expect(typeof $scope.removeItem).toBe('function');
    expect(typeof $scope.clearErrors).toBe('function');
    expect(typeof $scope.populateImages).toBe('function');
  });

  describe('should be able to utilize food controller functions', function() {
    beforeEach(angular.mock.inject(function(_$cookies_, _$location_, _foodData_) {
      $location = _$location_;
      $cookies = _$cookies_;
      foodData = _foodData_;

      this.foodController = $ControllerConstructor('foodController', {$scope: $scope});

      foodData.storeData(fakeStoreData);
    }));

    describe('should save single food item', function() {
      it('should store fake data into food data store', function() {
        $scope.saveSingleFood(fakeData);

        //saveSingleFood function saves object to $cookies
        //need to get the Object using angular $cookies directive
        expect($cookies.getObject('singleFood')[0].name).toBe('myName');
        expect($location.path()).toBe('/item');
      });
    });
  });
});
