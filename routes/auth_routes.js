'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');
var validator = require('validator');

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/create_user', function(req, res) {
    var newUserData = JSON.parse(JSON.stringify(req.body));
    delete newUserData.email;
    delete newUserData.password;

    var newUser = new User(newUserData);

    if (validator.isNull(req.body.email)) {
      return res.status(417).json({msg: 'email is required'});
    }

    if (!validator.isEmail(req.body.email)) {
      return res.status(417).json({msg: 'invalid email'});
    }

    if (validator.isNull(req.body.username)) {
      return res.status(417).json({msg: 'username is required'});
    }

    newUser.basic.email = req.body.email;

  });
};
