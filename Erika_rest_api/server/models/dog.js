'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var dogSchema = new mongoose.Schema({
  dogName: String,
  favoriteToy: String,
  fixed: Boolean,
  age: Number,
  kibblePreference: { type: String, default: 'fish' }
});

var Dog = mongoose.model('Dog', dogSchema);

Dog.schema.path('kibblePreference').validate(function(value) {
  return /fish|chicken|beef|mixed/i.test(value);
}, 'Unavailable kibble match');

module.exports = exports = mongoose.model('Dog', dogSchema);
