'use strict';
const superagent = require('superagent');
const cache = require('../modules/topCache');

const getTopAnimeByType = (req, res) => {
//   console.log(req.params);
const type = req.params.type;
if(cache[type]){
    console.log('getting data from cache');
    res.status(200).send(cache[type]);
}else{
    const url = (`https://api.jikan.moe/v3/top/anime/1/${type}`);
      superagent.get(url).then(data => {
        const animeData = data.body.top.map(animeData => new Top(animeData));
        console.log('getting data from api');
        cache[type] = animeData
        res.send(animeData);
      })
}
}

class Top {
  constructor(data) {
      this.id = data.mal_id,
      this.name = data.title,
      this.url = data.url,
      this.img = data.image_url,
      this.rating = data.score,
      this.type = data.type,
      this.followers = data.members,
      this.rank = data.rank,
      this.start = data.start_date,
      this.end = data.end_date
  }
}

module.exports = getTopAnimeByType;