'use strict';

require('../../app/js/client.js');
require('angular-mocks');

describe('Authentication Angular Service', function() {
  var auth;
  var $httpBackend;
  var $cookies;
  var fakeUser;
  var fakeResponse;
  var fakeCallback = function(err, data) {
    if (err) {
      return console.log(err);
    }
  };

  beforeEach(angular.mock.module('freezrApp'));
  beforeEach(angular.mock.inject(function(_auth_) {
    auth = _auth_;
  }));

  it('should create a new service', function() {
    expect(typeof auth).toBe('object');
    expect(typeof auth.signIn).toBe('function');
    expect(typeof auth.create).toBe('function');
    expect(typeof auth.logout).toBe('function');
    expect(typeof auth.isSignedIn).toBe('function');
  });

  describe('Authentication Services Functions', function() {
    beforeEach(angular.mock.inject(function(_$cookies_, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $cookies = _$cookies_;
      fakeUser = {
        email: 'fakeUser@example.com',
        password: 'foobar123',
        username: 'fakeUsername'
      };
      fakeResponse = {
        token: 'myToken',
        username: 'fakeUsername'
      };
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    afterEach(function() {
      auth.logout();
    });

    describe('the sign in function', function() {
      it('should make a GET request', function() {
        $httpBackend.expectGET('/api/sign_in').respond(200, fakeResponse);
        auth.signIn(fakeUser, fakeCallback);
        $httpBackend.flush();
        expect($cookies.get('username')).toBe('fakeUsername');
        expect($cookies.get('token')).toBe('myToken');
      });
    });

    describe('the create user account function', function() {
      it('should make a POST request and save cookies', function() {
        $httpBackend.expectPOST('/api/create_user').respond(200, fakeResponse);
        auth.create(fakeUser, fakeCallback);
        $httpBackend.flush();
        expect($cookies.get('username')).toBe('fakeUsername');
        expect($cookies.get('token')).toBe('myToken');
      });
    });

    describe('the isSignedIn validation function', function() {
      it('should return true when token exists and token has a length', function() {
        $cookies.put('token', 'fakeToken');
        expect(auth.isSignedIn()).toBe(true);
      });

      it('should return false when token does not exist', function() {
        expect(auth.isSignedIn()).toBe(false);
      });
    });
  });
});
