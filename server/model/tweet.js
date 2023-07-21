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

export function GetAllTweet() {
  return arrayOfTweets;
}
export function GetAllTweetByUsername(username) {
  return arrayOfTweets.filter((tweet) => tweet.username === username);
}

export function GetTweetbyId(id) {
  return arrayOfTweets.find((t) => t.id === id);
}

export function PostTweet({ text, name, username }) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  arrayOfTweets = [tweet, ...arrayOfTweets];
  return tweet;
}
export function PutTweet(id, text) {
  const tweet = arrayOfTweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}
export function DeleteTweet({ params }) {
  arrayOfTweets = arrayOfTweets.filter((tweet) => tweet.id !== params);
}
