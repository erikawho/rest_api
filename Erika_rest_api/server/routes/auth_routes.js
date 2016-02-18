'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const Human = require(__dirname + '/../models/dog');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const basicHTTP = require(__dirname + '/../lib/basic_http');

const authRouter = module.exports = exports = express.Router();

authRouter.get('/signin', basicHTTP, (req, res) => {
  Human.findOne({ 'authentication.email': req.basicHTTP.email }, (err, user) => {
    if (err) return handleDBError(err, res);

    if (!user) return res.status(401).json({ msg: 'Invalid username/password' });

    if (!user.comparePassword(req.basicHTTP.password)) return res.status(401).json({ msg: 'Invalid username/password' });

    res.json({ token: user.generateToken() });
  });
});

authRouter.post('/signup', bodyParser, (req, res) => {
  if (!(req.body.email || '').length) {
    return res.status(400).json({ msg: 'Invalid email' });
  }
  if (!((req.body.password || '').length > 7)) {
    return res.status(400).json({ msg: 'Please enter a password longer than 7 characters' });
  }
  Human.findOne({ 'authentication.email': req.body.email }, (err, email) => {
    if (err) return handleDBError(err, res);
    if (email) return res.status(400).json({ msg: 'Email taken - enter a new one' });

    var newHuman = new Human();

    newHuman.username = req.body.username || req.body.email;
    newHuman.authentication.email = req.body.email;
    newHuman.hashPassword(req.body.password);
    newHuman.save((err, data) => {
      if (err) return handleDBError(err, res);
      res.status(200).json({ token: data.generateToken() });
    });
  });
});
