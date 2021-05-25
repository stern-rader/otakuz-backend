'use strict';
const superagent = require('superagent');
const cache = {};

const getTopAnimes = (req, res) => {
  const url = ('https://private-anon-fd72fd82bb-jikan.apiary-proxy.com/v3/top/anime/1');
  if(cache)
  {
    superagent.get(url).then(data => {
      const animeData = data.body.top.map(animeData => new Anime(animeData));
      cache['searched'] = animeData ;
      res.send(animeData);
    })}
    else{
      res.send(cache);
    }
}

class Anime {
  constructor(data) {
    this.id = data.mal_id,
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

module.exports = getTopAnimes;
