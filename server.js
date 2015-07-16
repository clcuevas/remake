'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();


//this will be configured in heroku
process.env.APP_SECRET = process.env.APP_SECRET || 'changethis';

//add routers here
var freezrRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/freezr_dev');


app.use(express.static(__dirname + '/build'));

//add routes here
require('./routes/freezr_routes.js')(freezrRoutes);

app.use('/api', freezrRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on PORT ' + (process.env.PORT || 3000));
});//end listen method
