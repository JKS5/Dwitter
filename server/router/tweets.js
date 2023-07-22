import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('text should be atleast 3 characters'),
  validate,
];
// Get /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);
// GET /tweets/:id
router.get('/:id', tweetController.getTweetbyId);
// POST /tweets
router.post('/', validateTweet, tweetController.postTweet);
// PUT /tweets/:id
router.put('/:id', validateTweet, tweetController.putTweet);
// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
