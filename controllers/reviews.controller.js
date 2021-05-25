'use strict';
const reviewsModel = require('../models/reviews.model');


// save users comments in data base and save anime reviews if undefined
const postComment = async (req, res) => {
  const { id, email, comment } = req.body;
  console.log('name test' ,email);
  await reviewsModel.find({ id: id }, (err, anime) => {
    if (!anime[0]) {
      const anime = new reviewsModel({ id: id });
      anime.save();
    }
  });
  await reviewsModel.find({ id: id }, (err, anime) => {
    if (err) { return res.status(404).send(); }
    anime[0].reviews.push({
      email: email,
      comment: comment
    });
    anime[0].save();
    res.status(200).send(anime[0].reviews);
  });
}


// get anime reviews from data base
const getComments = async (req, res) => {
  const { id } = req.query
  await reviewsModel.find({ id: id }, (err, anime) => {
    if (!anime[0]) {
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
const deleteComment = async (req, res) => {
  const { commentId } = req.query;
  const { id } = req.params;
  await reviewsModel.find({ id: id }, (err, anime) => {
    const newReviews = anime[0].reviews.remove({ _id: commentId });
    anime[0].reviews = newReviews;
    anime[0].save();
    res.status(200).send(anime[0].reviews);
  });
};

module.exports = {
  postComment,
  getComments,
  deleteComment,
};
