'use strict';
const mongoose = require('mongoose');
const animeSchema = require('./animeList.model');
const imageSchema = require('./image.model');

const otakuzUserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  list: [animeSchema],
  profile_image: imageSchema.imageSchema,
});

const otakuzUserModel = mongoose.model('users', otakuzUserSchema);

module.exports = otakuzUserModel;
