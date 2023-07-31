import { db } from '../db/database.js';
import * as userRepository from './auth.js';

const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function GetAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

export async function GetAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
    .then((result) => result[0]);
  // return GetAll().then((tweets) =>
  //   tweets.filter((tweet) => tweet.username === username)
  // );
}

export async function GetbyId(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result) => result[0][0]);
  // const found = tweets.find((t) => t.id === id);
  // if (!found) {
  //   return null;
  // }
  // const { username, name, url } = await userRepository.findById(found.userId);
  // return { ...found, username, name, url };
}

export async function create(text, userId) {
  return db
    .execute(`INSERT INTO tweets (text, createdAt ,userId) VALUES(?,?,?)`, [
      text,
      new Date(),
      userId,
    ])
    .then((result) => GetbyId(result[0].insertId));
  // const tweet = {
  //   id: Date.now().toString(),
  //   text,
  //   createdAt: new Date(),
  //   userId,
  // };
  // tweets = [tweet, ...tweets];
  // return GetbyId(tweet.id);
}
export async function update(id, text) {
  return db
    .execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
    .then(() => GetbyId(id));
  // const tweet = tweets.find((tweet) => tweet.id === id);
  // if (tweet) {
  //   tweet.text = text;
  // }
  // return GetbyId(tweet.id);
}
export async function Remove(id) {
  return db.execute('DELETE FROM tweets WHERE id=?', [id]);
  // tweets = tweets.filter((tweet) => tweet.id !== params);
}
