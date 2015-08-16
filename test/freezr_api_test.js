'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/freezr_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var Item = require('../models/Items.js');

//add for authentication
var eat = require('eat');
var User = require('../models/User.js');
var saveUserToken = '';

describe('Item REST API', function() {
  before(function(done) {
    var itemTest = new Item({authorID: 'test', itemName: 'broccoli', itemType: 'vegetable', qty: 1, storageType: 'refrigerator'});
    itemTest.save(function(err, data) {
      if (err) {
        return console.log(err);
      }

      this.itemTest = data;
      done();
    }.bind(this));
  });//end BEFORE

  //create test user for API test
  var testUser = new User({'username': 'test', 'basic.email': 'test@example.com', 'basic.password': 'foobar123'});

  //generate hash for test user to save the token
  testUser['basic.password'] = testUser.generateHash(testUser['basic.password'], function(err, hash) {
    if (err) {
      console.log('in generate hash ' + err);
      res.status(500).json({msg: 'could not save password'}); //jshint ignore:line
    }

    testUser['basic.password'] = hash;

    testUser.save(function(err, user) {
      if (err) {
        return console.log(err);
      }

      user.generateToken(process.env.APP_SECRET, function(err, token) {
        if (err) {
          return console.log(err);
        }

        saveUserToken = token;
      });
    });
  });

  after(function(done) {
    //disconnect database
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });//end AFTER

  it('should GET an item from the collection', function(done) {
    chai.request('localhost:3000')
      .get('/api/food_items')
      .send({token: saveUserToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.equal('object');
        expect(res.body[0].itemName).to.equal('broccoli');
        done();
      });
  });

  it('should POST a new item', function(done) {
    chai.request('localhost:3000')
      .post('/api/food_items')
      .send({authorID: 'test', itemName: 'celery', itemType: 'vegetable', qty: 1, storageType: 'refrigerator', token: saveUserToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('itemName');
        expect(res.body.authorID).to.equal('test');
        done();
      });
  });

  it('should UPDATE an existing item', function(done) {
    chai.request('localhost:3000')
      .put('/api/food_items/' + this.itemTest._id)
      .send({itemName: 'zucchini', token: saveUserToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.equal('updated item successfully');
        done();
      });
  });

  it('should DELETE an existing item', function(done) {
    chai.request('localhost:3000')
      .del('/api/food_items/' + this.itemTest._id)
      .send({token: saveUserToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.equal('deleted item successfully');
        done();
      });
  });

  it('should be able to SIGN IN as test user', function(done) {
    chai.request('localhost:3000')
      .get('/api/sign_in')
      .set('email', 'test@example.com')
      .set('password', 'foobar123')
      .set('token', saveUserToken)
      .end(function(err, res) {
        expect(err).to.eql(null);
        //set to unauthorized after connection closes/ends
        expect(res.status).to.eql(401);
        done();
      });
  });
});
