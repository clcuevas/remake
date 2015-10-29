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

    //make sure username field is not null
    if (validator.isNull(req.body.username)) {
      return res.status(417).json({msg: 'username is required'});
    }

    //make sure email is not null
    if (validator.isNull(req.body.email)) {
      return res.status(417).json({msg: 'email is required'});
    }

    //make sure email being input is an email
    if (!validator.isEmail(req.body.email)) {
      return res.status(417).json({msg: 'invalid email'});
    }

    newUser.basic.email = req.body.email;
    newUser.basic.password = newUser.generateHash(req.body.password, function(err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'could not save password'});
      }

      newUser.basic.password = hash;

      newUser.save(function(err, user) {
        if (err) {
          //if error occurs because of a dup key, grab the dup key and save it to field
          var field = err.message.split('.$')[1];
          field = field.split(' dup key')[0];
          field = field.substring(0, field.lastIndexOf('_'));

          if (field == 'basic.email') {
            return res.status(417).json({msg: 'Email already exists!'});
          } else if (field == 'username') {
            return res.status(417).json({msg: 'Username already exists!'});
          } else {
            return res.status(500).json({msg: 'could not create user'});
          }
        }

        user.generateToken(process.env.APP_SECRET, function(err, token) {
          if (err) {
            console.log(err);
            return res.status(500).json({msg: 'error generating token'});
          }

          res.json({token: token});
        });//end generateToken
      });//end save
    });//end generateHash
  });//end POST method

  router.get('/sign_in', passport.authenticate('basic', {session:false}), function(req, res) {
    req.user.generateToken(process.env.APP_SECRET, function(err, token) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'error generating token'});
      }

      res.json({msg: 'authenticated as: ' + req.user.basic.email, username: req.user.username, token: token});
    });//end generateToken
  });//end GET
};
