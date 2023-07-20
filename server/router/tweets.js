import express from 'express';
import 'express-async-errors';

let arrayOfTweets = [
  {
    id: '1',
    text: 'test1',
    createdAt: Date.now().toString(),
    name: 'Ellie',
    username: 'ellie',
    // url: 'optionalpicture',
  },
  {
    id: '2',
    text: 'test34531',
    createdAt: Date.now().toString(),
    name: 'james1',
    username: 'james1',
    // url: 'optionalpicture',
  },
  {
    id: '3',
    text: '드림코딩에서 강의 들으면 너무 좋으다',
    createdAt: '2021-05-09T04:20:57.000Z',
    name: 'Bob',
    username: 'bob',
    // url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
];

const router = express.Router();

// Get /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? arrayOfTweets.filter((tweet) => tweet.username === username)
    : arrayOfTweets;
  res.status(200).json(data);
});
// GET /tweets/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const tweet = arrayOfTweets.find((t) => t.id === id);
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
  console.log(req.body);
  const { text, name, username } = req.body;
  console.log(text, name, username);
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  arrayOfTweets = [tweet, ...arrayOfTweets];
  res.status(201).json(tweet);
});
// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;

  const tweet = arrayOfTweets.find((tweet) => tweet.id === id);
  console.log(tweet);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id ${id} doesn't exist` });
  }
});

// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  const params = req.params.id;
  if (params) {
    arrayOfTweets = arrayOfTweets.filter((tweet) => tweet.id !== params);
    res.sendStatus(204);
  }
});

export default router;
