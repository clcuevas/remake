'use strict';

let express = require('express');
let mongoose = require('mongoose');
let passport = require('passport');

let app = express();

// This will be configured in Heroku
process.env.APP_SECRET = process.env.APP_SECRET || 'changethis';

// Add routers here
let freezrRoutes = express.Router();
let userRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/freezr_dev');

app.use(passport.initialize());
app.use(express.static(__dirname + '/public'));

// Add routes here
require('./server_files/routes/freezr_routes')(freezrRoutes);
require('./server_files/routes/auth_routes')(userRoutes, passport);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api', freezrRoutes);
app.use('/api', userRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log('server running on PORT ' + (process.env.PORT || 8000));
});
