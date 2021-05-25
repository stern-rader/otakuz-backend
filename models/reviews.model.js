'use strict';
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    email: String,
    comment: String
});

const reviewSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    reviews: [commentSchema]
});

const reviewsModel = mongoose.model('reviews', reviewSchema);

module.exports = reviewsModel