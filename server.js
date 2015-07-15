'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

//this will be configured in heroku
process.env.APP_SECRET = process.env.APP_SECRET || 'changethis';

//add routers here

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/freezr_dev');

//add routes here

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on PORT ' + (process.env.PORT || 3000));
});//end listen method
