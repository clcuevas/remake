'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/freezr_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var Item = require('../models/Items.js');

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

  after(function(done) {
    //disconnect database
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });//end AFTER

  it('should GET an item from the collection', function(done) {
    chai.request('localhost:3000')
      .get('/api/food_items')
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
      .send({authorID: 'test2', itemName: 'celery', itemType: 'vegetable', qty: 1, storageType: 'refrigerator'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('itemName');
        expect(res.body.authorID).to.equal('test2');
        done();
      });
  });

  it('should UPDATE an existing item', function(done) {
    chai.request('localhost:3000')
      .put('/api/food_items/' + this.itemTest._id)
      .send({itemName: 'zucchini'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.equal('updated item successfully');
        done();
      });
  });

  it('should DELETE an existing item', function(done) {
    chai.request('localhost:3000')
      .del('/api/food_items/' + this.itemTest._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.equal('deleted item successfully');
        done();
      });
  });
});
