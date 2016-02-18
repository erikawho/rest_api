'use strict';

const mongoose = require('mongoose');

var humanSchema = new mongoose.Schema({
  name: String,
  fitnessLevel: Number,
  dogPreference: { type: String, default: 'Akita' },
  authentication: {
    email: { type: String, required: true },
    password: { type: String, required: true }
  }
});

humanSchema.methods.hashPassword = function(password) {
  var hash = this.authentication.password = bcrypt.hashSync(password, 8);
  return hash;
};

humanSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.authentication.password);
};

humanSchema.methods.generateToken = function() {
  return jwt.sign({id: this._id}, process.env.APP_SECRET || 'changethis');
};

module.exports = exports = mongoose.model('Human', humanSchema);
