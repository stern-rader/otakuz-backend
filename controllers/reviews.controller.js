'use strict';
const reviewsModel = require('../models/reviews.model');
const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(
  `mongodb+srv://otakuz:otakuz0000@cluster0.jz9lz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
// save users comments in data base and save anime reviews if undefined
const postComment = async (req, res) => {
  const { id, email, comment, date } = req.body;
  console.log('body data' , req.body);
  await reviewsModel.find({ id: id }, (err, anime) => {
    if (anime.length <= 0) {
      const anime = new reviewsModel({ id: id });
      anime.save();
    }
  });
  await reviewsModel.find({ id: id }, (err, anime) => {
    if (err) { return res.status(404).send(); }
    anime[0].reviews.push({
      email: email,
      comment: comment,
      date: date
    });
    anime[0].save();
    res.status(200).send(anime[0].reviews);
  });
}


// get anime reviews from data base
const getComments = async (req, res) => {
  const { id } = req.query;
  console.log('query id' , id);
  await reviewsModel.find({ id: id }, (err, anime) => {
    if (anime.length <= 0) {
      const anime = new reviewsModel({ id: id });
      anime.save();
    };
  });
  await reviewsModel.find({ id: id }, (err, anime) => {
    if (err) { return res.status(500).send(); }
    res.status(200).send(anime[0].reviews);
  });
};


// delete a review made by a user
// const deleteComment = async (req, res) => {
//   const { commentId } = req.query;
//   const { id } = req.params;
//   await reviewsModel.find({ id: id }, (err, anime) => {
//     const newReviews = anime[0].reviews.remove({ _id: commentId });
//     anime[0].reviews = newReviews;
//     anime[0].save();
//     res.status(200).send(anime[0].reviews);
//   });
// };

module.exports = {
  postComment,
  getComments,
  // deleteComment,
};
