'use strict';

let bodyparser = require('body-parser');
let Item = require('../models/Item');
let eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/item', eatAuth, (req, res) => {
    let newItem = new Item(req.body);
    newItem.authorID = req.user.username;
    newItem.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }

      res.json(data);
    });
  }); // end POST method

  router.get('/item', eatAuth, (req, res) => {
    Item.find({ authorID: req.user.username }, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }

      res.json(data);
    });
  }); // end GET method

  /*
    TODO: Add security to the PUT and DELETE requests. Users should
    only be able to modify and delete items that they created.
  */

  router.put('/item/:id', (req, res) => {
    let updatedItem = req.body;
    delete updatedItem._id;

    Item.update({ '_id': req.params.id }, updatedItem, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }

      res.json({ msg: 'updated item successfully' });
    });
  }); // end PUT method

  router.delete('/item/:id', (req, res) => {
    Item.remove({ '_id': req.params.id }, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }

      res.json({ msg: 'deleted item successfully' });
    });
  }); // end DELETE method
};
