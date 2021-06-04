const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const getAnime = require('./components/anime');
const getTopAnimes = require('./components/getTopAnimes');
const getAnimeByGenre = require('./components/animeGenre');
const getTopAnimeByType = require('./components/getTopAnimeByType');
const otakuzController = require('./controllers/otakuzUser.controller');
const getanimebyid = require('./components/animieDetails');
const reviews = require('./controllers/reviews.controller');
// const doComment = require('./controllers/comments');

const app = express();
app.use(cors());
app.use(express.json());

const Port = process.env.PORT || 3666;

mongoose.connect(
  `mongodb+srv://otakuz:otakuz0000@cluster0.jz9lz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.get('/', function (req, res) {
  res.send('"Curse the fiends, their children too. And their children, forever, true" - villagers of the Fishing Hamlet ')
});

// test cors
var allowlist = ['https://otakuz.netlify.app/', 'https://otakuz.netlify.app/profile']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}



// JIKAN
// JIKAN api (search by name)
app.get('/anime', getAnime);
// JIKAN api (by genre)
app.get('/anime/genre/:genre', getAnimeByGenre);
// JIKAN api (search top anime by type)
app.get('/anime/top/:type', getTopAnimeByType);
// JIKAN api (top anime)
app.get('/topAnimes', cors(corsOptionsDelegate), getTopAnimes);

app.get('/do-review', getanimebyid);

// Data Base
// add user to data base
app.post('/otakuzUser', otakuzController.createUser);
// get a user list from data base
app.get('/otakuzUser', cors(corsOptionsDelegate) ,otakuzController.getUserList);
// delete user from data base
app.delete('/otakuzUser/:id', otakuzController.deleteUser);
// add anime to a user list in data base
app.post('/otakuzUser/user-list', otakuzController.addAnime);
// delete anime from a user in data base
app.delete('/otakuzUser/user-list/:id', otakuzController.deleteAnime);
// get anime reviews from data base
app.get('/reviews', reviews.getComments);
// // save user comments on an anime in data base
app.post('/reviews', reviews.postComment);
// delete a review made by a user
// app.delete('/reviews/:id', reviews.deleteComment);


app.listen(Port, () => {
  console.log(`server starts at port ${Port}`);
})
