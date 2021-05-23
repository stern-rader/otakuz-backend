const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const getAnime = require('./components/anime');
const getTopAnimes = require('./components/getTopAnimes');
const otakuzController = require('./controllers/otakuzUser.controller');

const app = express();
app.use(cors());
app.use(express.json());

const Port = process.env.PORT || 3666;

mongoose.connect(
  'mongodb://127.0.0.1:27017/otakuzUser',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
);

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get('/anime', getAnime);

app.get('/topAnimes', getTopAnimes);

app.post('/user', otakuzController.createUser);

app.delete('/delete/:id', otakuzController.deleteUser);

app.get('/otakuzUser', otakuzController.getUser);

app.post('/otakuzUser', otakuzController.addAnime);

app.delete('/otakuzUser/:id', otakuzController.deleteAnime);


app.listen(Port, () => {
  console.log(`server is ${Port}`);
})
