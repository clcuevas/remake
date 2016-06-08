'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');
let eat = require('eat');

let userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  basic: {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  }
});

userSchema.methods.generateHash = function(password, callback) {
  bcrypt.genSalt(8, (err, salt) => {
    if (err) {
      return console.log(err);
    }

    bcrypt.hash(password, salt, null, (err, hash) => {
      if (err) {
        return console.log(err);
      }

      callback(null, hash);
    });
  });
};

userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.basic.password, (err, result) => {
    if (err) {
      console.log(err);
      return console.log('could not authenticate password');
    }

    callback(null, result);
  });
};

userSchema.methods.generateToken = function(secret, callback) {
  eat.encode({ id: this._id }, secret, callback);
};

userSchema.methods.owns = function(obj) {
  return obj.authorID === this.username;
};

module.exports = mongoose.model('User', userSchema);
