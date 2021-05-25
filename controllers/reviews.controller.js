'use strict';
const reviewsModel = require('../models/reviews.model');

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
};

module.exports = {
  postComment
};
