'use strict';
const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    email: String,
    comment: String,
    date: String
});

const reviewSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    reviews: [commentSchema]
});

const reviewsModel = mongoose.model('reviews', reviewSchema);

// const seedReviews = new reviewsModel({
//     id:"12376347",
//     reviews:[{email:"test q" , comment:"test q" , date:"test q"}]
// })

// seedReviews.save();

// console.log(seedReviews);

module.exports = reviewsModel