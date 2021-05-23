const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const getAnime = require('./components/anime');
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
  res.send('"Curse the fiends, their children too. And their children, forever, true" - villagers of the Fishing Hamlet ')
});

// JIKAN  api 
app.get('/anime', getAnime);
// add user to data base
app.post('/otakuzUser', otakuzController.createUser);
// delete user from data base
app.delete('/otakuzUser/:id', otakuzController.deleteUser);
// get a user from data base
app.get('/otakuzUser', otakuzController.getUser);
// add anime to a user list in data base
app.post('/otakuzUser/user-list', otakuzController.addAnime);
// delete anime from a user in data base
app.delete('/otakuzUser/user-list/:id', otakuzController.deleteAnime);


app.listen(Port, () => {
  console.log(`server starts at port ${Port}`);
})
