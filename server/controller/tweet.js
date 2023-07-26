import express from 'express';
import 'express-async-errors';
import * as ImportData from '../model/tweet.js';

export async function getTweets(req, res, next) {
  const username = req.query.username;
  const data = await (username
    ? ImportData.GetAllByUsername(username)
    : ImportData.GetAll());
  res.status(200).json(data);
}

export async function getTweetbyId(req, res) {
  const id = req.params.id;
  const tweet = await ImportData.GetbyId(id);
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

export async function postTweet(req, res, next) {
  const { text } = req.body;
  const createdTweet = await ImportData.create(text, req.userId);
  res.status(201).json(createdTweet);
}

export async function putTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await ImportData.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id ${id} doesn't exist` });
  }
}
export async function deleteTweet(req, res, next) {
  const params = req.params.id;
  if (params) {
    await ImportData.Remove(params);
    res.sendStatus(204);
  }
}
