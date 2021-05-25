'use strict';
const mongoose = require('mongoose');
const animeSchema = require('./animeList.model');

const otakuzUserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  list: [animeSchema],
});

const otakuzUserModel = mongoose.model('users', otakuzUserSchema);

module.exports = otakuzUserModel;
