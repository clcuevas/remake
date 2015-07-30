'use strict';

var bodyparser = require('body-parser');
var Items = require('../models/Items.js');
var eatAuth = require('../lib/eat_auth.js')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/food_items', eatAuth, function(req, res) {
    var newItem = new Items(req.body);
    newItem.authorID = req.user.username;
    newItem.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });//end POST method

  router.get('/food_items', eatAuth, function(req, res) {
    Items.find({authorID: req.user.username}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });//end GET method

  router.put('/food_items/:id', function(req, res) {
    var updatedItem = req.body;
    delete updatedItem._id;

    Items.update({'_id': req.params.id}, updatedItem, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'updated item successfully'});
    });
  });//end PUT method

  router.delete('/food_items/:id', function(req, res) {
    Items.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'deleted item successfully'});
    });
  });//end DETELE method
};
