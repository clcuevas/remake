'use strict';
//
// This authentication is a middleware that forces
// users to login, locks down routes (requires login)
//
let eat = require('eat');
let User = require('../models/User');

//
// This returns a callback that gets passed (closure)
//
module.exports = function(secret) {
  return function(req, res, next) {
    let token = req.headers.token || req.body.token;

    if (!token) {
      console.log('unauthorized, no token in request');
      return res.status(401).json({ msg: 'not authorized' });
    }

    eat.decode(token, secret, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ msg: 'not authorized' });
      }

      User.findOne({ _id: decoded.id }, (err, user) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ msg: 'not authorized' });
        }

        if (!user) {
          console.log('no user found for that token');
          return res.status(401).json({ msg: 'no user found' });
        }

        req.user = user;
        next();
      });
    });
  };
};
