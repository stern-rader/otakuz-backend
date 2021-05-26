'use strict';
const superagent = require('superagent');
const cache = require('../modules/animeCache');

const getAnimeBYId = (req, res) => {
  const anime_id = req.query.id;
  let backData = [];
  const url = (`https://api.jikan.moe/v3/anime/${anime_id}`);
  superagent.get(url).then(data => {
    for (const key in data.body) {
      console.log(`${key}: ${data.body[key]}`);
      backData = new AnimeByID(data.body);
      res.send(backData);
    }
  });
}


class AnimeByID {
  constructor(data) {
    this.id = data.mal_id,
      this.name = data.title,
      this.englishName = data.title_english,
      this.url = data.url,
      this.img = data.image_url,
      this.rating = data.score,
      this.type = data.type,
      this.start = data.aired.string,
      this.trailer = data.trailer_url,
      this.description = data.synopsis


  }
}

module.exports = getAnimeBYId;
