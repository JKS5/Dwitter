import express from 'express';
import 'express-async-errors';
import * as userRepository from './auth.js';

let tweets = [
  {
    id: '1',
    text: 'test1',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: '나 유저아이디 1이 적은 트윗내용이야',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '3',
    text: 'test 3도 너무 좋으다',
    createdAt: '2021-05-09T04:20:57.000Z',
    userId: '3',
    // url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
];

export async function GetAll() {
  //Promise.all은 순회가능한 promise(배열형태의 내부 value들이 promise)를 input으로 가지고, 하나의 promise를 return한다.
  // [object Promise]
  // fullfillment value와 함께 반환한다.
  //task 순서가 상관없다면 비동기 Promise들을 함께 묶어서 병렬적으로 처리하기 위함
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function GetAllByUsername(username) {
  return GetAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function GetbyId(id) {
  const found = tweets.find((t) => t.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return GetbyId(tweet.id);
}
export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return GetbyId(tweet.id);
}
export async function Remove({ params }) {
  tweets = tweets.filter((tweet) => tweet.id !== params);
}
