'use strict';
const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    name: String,
    url: String,
    img: String,
    description: String,
    rating: Number,
    type: String,
    rate: String,
    start: String,
    end: String,
    followers: Number,
  });
  
  const animeListModel = mongoose.model('lists', animeSchema);

  module.exports = animeSchema;