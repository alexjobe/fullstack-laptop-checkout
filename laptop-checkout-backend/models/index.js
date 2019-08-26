const connect_string = process.env.CONNECTION_STRING || 'mongodb://localhost/laptop-checkout-api';

var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(connect_string); // Connect to MongoDB server

mongoose.Promise = Promise;

module.exports.Laptop = require('./laptop');
module.exports.Checkout = require('./checkout');