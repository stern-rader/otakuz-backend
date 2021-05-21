const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const superagent = require('superagent');
require('dotenv').config();
const cache = require('./modules/cache');
const mongoose = require('mongoose');
const Port = process.env.PORT || 3666;

mongoose.connect(
  'mongodb://127.0.0.1:27017/user',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const otakuzUserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  list: [animeSchema]
});

const animeSchema = new mongoose.Schema({
  
});

function showAnime(req, res) {
  // console.log(res);
  const url = ('https://api.jikan.moe/v3/search/anime');
  const q = `${req.query.q}`;
  const params = { q: q }
  if (cache[q]) {
    console.log('getting data from cache');
    res.status(200).send(cache[q])
  } else {
    superagent.get(url).query(params).then(data => {
      console.log('getting data from API');
      const animeData = data.body.results.map(animeData => new Anime(animeData));
      // console.log(animeData);
      res.send(animeData);
      cache[q] = animeData;
    })

  }

}

class Anime {
  constructor(data) {
    this.name = data.title,
      this.img = data.image_url,
      this.url = data.url,
      this.description = data.synopsis,
      this.rating = data.score,
      this.type = data.type,
      this.rate = data.rated,
      this.start = data.start_date,
      this.end = data.end_date,
      this.followers = data.members
  }
}



// server//////////////////////////////////////////////////
app.get('/anime', showAnime);

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.listen(Port, () => {
  console.log(`server is ${Port}`);
})
