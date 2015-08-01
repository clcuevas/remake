'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();


//this will be configured in heroku
process.env.APP_SECRET = process.env.APP_SECRET || 'changethis';

//add routers here
var freezrRoutes = express.Router();
var usersRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/freezr_dev');

app.use(passport.initialize());
app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/app'));

require('./lib/passport_strat.js')(passport);

//add routes here
require('./routes/freezr_routes.js')(freezrRoutes);
require('./routes/auth_routes.js')(usersRoutes, passport);

app.use('/api', freezrRoutes);
app.use('/api', usersRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on PORT ' + (process.env.PORT || 3000));
});//end listen method
