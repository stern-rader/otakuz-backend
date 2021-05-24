const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true },
  function (error, client) {
    const blog = client.db('blog');
    console.log('db connected');
  });

function doComment(req, res) {
  blog.collection('post').update({ '_id': ObjectID(req.body.post_id) }, {
    $push: {
      'comments': { username: req.body.email, comment: req.body.comment }
    }
  },
    function (error, post) {
      res.send('comment successfully');


    });
}
module.exports = doComment;