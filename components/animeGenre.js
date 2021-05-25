'use strict';
const superagent = require('superagent');
const cache = require('../modules/genreCache');

const getAnimeByGenre = (req, res) => {
//   console.log(req.params);
const genre = req.params.genre;
if(cache[genre]){
    console.log('getting data from cache');
    res.status(200).send(cache[genre]);
}else{
    const url = (`https://api.jikan.moe/v3/genre/anime/${genre}`);
      superagent.get(url).then(data => {
        const animeData = data.body.anime.map(animeData => new Genre(animeData));
        console.log('getting data from api');
        cache[genre] = animeData
        res.send(animeData);
      })
}
}

class Genre {
  constructor(data) {
      this.id = data.mal_id,
      this.name = data.title,
      this.url = data.url,
      this.img = data.image_url,
      this.description = data.synopsis,
      this.rating = data.score,
      this.type = data.type,
      this.followers = data.members,
      this.genre = data.genres
  }
}

module.exports = getAnimeByGenre;