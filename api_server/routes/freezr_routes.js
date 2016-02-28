'use strict';

let bodyparser = require('body-parser');
let Items = require('../models/Items');
// let eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/items', /*eatAuth,*/ (req, res) => {
    let newItem = new Item(req.body);
    //newItem.authorID = req.user.username;
    newItem.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }

      res.json(data);
    });
  }); // end POST method

  router.get('/items',/* eatAuth,*/ (req, res) => {
    Items.find({/*authorID: req.user.username*/}, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }

      res.json(data);
    });
  }); // end GET method

  router.put('/items/:id', (req, res) => {
    let updatedItem = req.body;
    delete updatedItem._id;

    Items.update({ '_id': req.params.id }, updatedItem, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }

      res.json({ msg: 'updated item successfully' });
    });
  }); // end PUT method

  router.delete('/items/:id', (req, res) => {
    Items.remove({ '_id': req.params.id }, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }

      res.json({ msg: 'deleted item successfully' });
    });
  }); // end DELETE method
};
