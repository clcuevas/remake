'use strict';

let Basic = require('passport-http').BasicStrategy;
let User = require('../models/User');

module.exports = function(passport) {
  passport.use('basic', new Basic({}, (email, password, done) => {
    User.findOne({ 'basic.email': email }, (err, user) => {
      if (err) {
        return done('database error');
      }

      if (!user) {
        return done('no such user');
      }

      user.checkPassword(password, (err, result) => {
        if (err) {
          return console.log(err);
        }

        if (result) {
          return done(null, user);
        } else {
          return done('wrong password');
        }
      });
    });
  }));
};
