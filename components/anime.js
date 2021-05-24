'use strict';
const superagent = require('superagent');
const cache = require('../modules/animeCache');

const getAnime = (req, res) => {
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
      cache[q] = animeData;
      res.send(animeData);
    })
  }
}

class Anime {
  constructor(data) {
      this.name = data.title,
      this.url = data.url,
      this.img = data.image_url,
      this.description = data.synopsis,
      this.rating = data.score,
      this.type = data.type,
      this.rate = data.rated,
      this.start = data.start_date,
      this.end = data.end_date,
      this.followers = data.members
  }
}

module.exports = getAnime;
