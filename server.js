const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { json } = require('express');
const mongoose = require('mongoose');
const getAnime = require('./components/anime');
const getTopAnimes = require('./components/getTopAnimes');
const getAnimeByGenre = require('./components/animeGenre');
const getTopAnimeByType = require('./components/getTopAnimeByType');
const reviews = require('./controllers/reviews.controller');
const otakuzController = require('./controllers/otakuzUser.controller');


const app = express();
app.use(cors());
app.use(express.json());

const Port = process.env.PORT || 3666;

mongoose.connect(
  `${process.env.MONGO_DB_URL}/otakuz`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
);
// mongoose.connect(
//   `${process.env.MONGO_DB_URL}/otakuzReviews`,
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
// );

app.get('/', function (req, res) {
  res.send('"Curse the fiends, their children too. And their children, forever, true" - villagers of the Fishing Hamlet ')
});

// JIKAN api (search by name)
app.get('/anime', getAnime);
// JIKAN api (by genre)
app.get('/anime/genre/:genre', getAnimeByGenre);
// JIKAN api (search top anime by type)
app.get('/anime/top/:type', getTopAnimeByType);
// JIKAN api (top anime)
app.get('/topAnimes', getTopAnimes);


// add user to data base
app.post('/otakuzUser', otakuzController.createUser);
// get a user list from data base
app.get('/otakuzUser', otakuzController.getUserList);
// delete user from data base
app.delete('/otakuzUser/:id', otakuzController.deleteUser);
// add anime to a user list in data base
app.post('/otakuzUser/user-list', otakuzController.addAnime);
// delete anime from a user in data base
app.delete('/otakuzUser/user-list/:id', otakuzController.deleteAnime);
// save user comments on an anime
app.post('/reviews', reviews.postComment);



app.listen(Port, () => {
  console.log(`server starts at port ${Port}`);
})
