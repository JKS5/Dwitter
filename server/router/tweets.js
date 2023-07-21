import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';

const router = express.Router();

// Get /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);
// GET /tweets/:id
router.get('/:id', tweetController.getTweetbyId);
// POST /tweets
router.post('/', tweetController.postTweet);
// PUT /tweets/:id
router.put('/:id', tweetController.putTweet);
// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
