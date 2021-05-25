'use strict';
const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  url: {
    type: String
  },
  img: {
    type: String
  },
  description: {
    type: String
  },
  rating: {
    type: Number
  },
  type: {
    type: String
  },
  rate: {
    type: String
  },
  start: {
    type: String
  },
  end: {
    type: String
  },
  followers: {
    type: Number
  },
});

const animeListModel = mongoose.model('lists', animeSchema);

module.exports = animeSchema