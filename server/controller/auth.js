import express from 'express';
import 'express-async-errors';
import * as userRepository from '../model/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Todo: Make it secure!
const jwtSecretKey = '4CdtAiG5ZM3PxgW^aWh@BEO8s%pa5xrH';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function postSignUp(req, res, next) {
  //데이터 받아오기
  const { username, password, name, email, url } = req.body;
  // data 찾아오기
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}
export async function login(req, res, next) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    res.status(401).json({ message: 'Invalid user or password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).josn({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
