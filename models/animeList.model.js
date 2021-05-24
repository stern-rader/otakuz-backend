'use strict';
const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
<<<<<<< HEAD
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
    id:String
=======
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
>>>>>>> 80dc51ce58e2bf989b4351bba84fb64241415cb9
  });
  
  const animeListModel = mongoose.model('lists', animeSchema);

  module.exports = animeSchema