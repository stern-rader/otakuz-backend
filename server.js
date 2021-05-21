const express = require('express');
const app = express();
const Port = process.env.PORT || 3030;
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();
const cache = require('./modules/cache');




app.get('/', function (req, res) {
  res.send('Hello World')
});


app.get('/anime', showAnime);

function showAnime(req, res) {

  const url = ('https://api.jikan.moe/v3/search/anime');
  const key = `${req.query.q}`;
  const params = {
    key: req.query.q,
  }
  if (cache[key]) {
    res.send(cache[key]);
  }
  else {
    superagent.get(url).query(params).then(data => {
      // const animeData = data.body.animeData.map
      res.send(data.results);
    })
  }


}














app.listen(Port, () => {
  console.log(`server is ${Port}`);
})
