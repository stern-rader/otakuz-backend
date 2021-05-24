'use strict';
const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true
    },
    url: {
      type: String,
      unique: true
    },
    img: {
      type: String,
      unique: true
    },
    description: {
      type: String,
      unique: true
    },
    rating: {
      type: Number,
      unique: true
    },
    type: {
      type: String,
      unique: true
    },
    rate: {
      type: String,
      unique: true
    },
    start: {
      type: String,
      unique: true
    },
    end: {
      type: String,
      unique: true
    },
    followers: {
      type: Number,
      unique: true
    },
  });
  
  const animeListModel = mongoose.model('lists', animeSchema);

  module.exports = animeSchema