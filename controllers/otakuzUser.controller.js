'use strict';
const { json } = require('express');
const otakuzUserModel = require('../models/otakuzUser.model');
var ObjectId = require('mongodb').ObjectId; 
// crate new user
// const createUser = (req, res) => {
//   const { email } = req.body;
//   const user = new otakuzUserModel({ email: email });
//   user.save();
//   res.status(200).send('user was added');
// };

const createUser = (email) => {
  // const email  = email;
  const user = new otakuzUserModel({ email: email });
  user.save();
  // res.status(200).send('user was added');
};

// get a user from data base
const getUserList = async (req, res) => {
  const { email } = req.query;
  await otakuzUserModel.find({ email: email }, (err, user) => {
    if (!user[0]) createUser(email);
    // console.log('in create',user[0])
  });

  await otakuzUserModel.find({ email: email }, (err, user) => {
    if (err) { return res.status(404).send() }
    // console.log('get from profile' ,user[0]);
    res.status(200).send(user[0].list)
  });
};

//add anime to user list
const addAnime = async (req, res) => {
  const { email, name, url, img, description, rating, type, rate, start, end, followers , id} = req.body;
  await otakuzUserModel.find({ email: email }, (err, user) => {
    if (!user[0]) createUser(email);
    // console.log(user[0]);
  });
  await otakuzUserModel.find({ email: email }, (err, user) => {
    if (err) { return res.status(404).send() }
    user[0].list.push({
      name: name,
      url: url,
      img: img,
      description: description,
      rating: rating,
      type: type,
      rate: rate,
      start: start,
      end: end,
      followers: followers
    });
    user[0].save();
    res.send(user[0].list);
  })
};

// delete an anime from a user
const deleteAnime = async (req, res) => {
  const id = req.params.id;
  const { email } = req.query;
  await otakuzUserModel.find({ email: email }, (err, user) => {
    if (err) { return res.status(404).send() }
    const newList = user[0].list.remove({ _id: id });
    user[0].list = newList;
    user[0].save();
    res.status(200).send(user[0].list);
  });
};


// delete a user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { email } = req.query;
  await otakuzUserModel.findOneAndRemove({ email: email }, (err, user) => {
    if (err) { return res.status(500).send() }
    return res.status(200).send('user deleted');
  });
};

module.exports = {
  createUser,
  getUserList,
  addAnime,
  deleteAnime,
  deleteUser,
};
