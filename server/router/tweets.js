import express from 'express';
import 'express-async-errors';
import * as ImportData from '../model/tweet.js';

const router = express.Router();

// Get /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? ImportData.GetAllTweetByUsername(username)
    : ImportData.GetAllTweet();
  res.status(200).json(data);
});
// GET /tweets/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const tweet = ImportData.GetTweetbyId(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.sendStatus(404);
  }
  // const data = id
  //   ? arrayOfTweets.find((tweet) => tweet.id === id)
  //   : `the tweet that has id:(${id}) doesn't exist`;
  // console.log(data);
  // res.status(200).json(data);
});
// POST /tweets
router.post('/', (req, res, next) => {
  const createdTweet = ImportData.PostTweet(req.body);
  res.status(201).json(createdTweet);
});
// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = ImportData.PutTweet(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id ${id} doesn't exist` });
  }
});

// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  const params = req.params.id;
  if (params) {
    ImportData.DeleteTweet(params);
    res.sendStatus(204);
  }
});

export default router;
