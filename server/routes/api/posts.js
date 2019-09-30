const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get posts
router.get('/', async (req, res) => {
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray());
})
//add posts
router.post('/', async (req, res) => {
  const posts = await loadPostCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
})
//delete posts
router.delete('/:id', async (req, res) => {
  const posts = await loadPostCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(201).send();
})
async function loadPostCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://localhost:27017/vue-express-db', {
    useNewUrlParser: true
  })
  return client.db("vue-express-db").collection('posts')
}
module.exports = router;