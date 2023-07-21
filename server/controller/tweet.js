import express from 'express';
import 'express-async-errors';
import * as ImportData from '../model/tweet.js';
export function getTweets(req, res, next) {
  const username = req.query.username;
  const data = username
    ? ImportData.GetAllByUsername(username)
    : ImportData.GetAll();
  res.status(200).json(data);
}

export function getTweetbyId(req, res) {
  const id = req.params.id;
  const tweet = ImportData.GetbyId(id);
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
}

export function postTweet(req, res, next) {
  const createdTweet = ImportData.Post(req.body);
  res.status(201).json(createdTweet);
}

export function putTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = ImportData.Put(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id ${id} doesn't exist` });
  }
}
export function deleteTweet(req, res, next) {
  const params = req.params.id;
  if (params) {
    ImportData.Remove(params);
    res.sendStatus(204);
  }
}
