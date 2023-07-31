import express from 'express';
import 'express-async-errors';
import * as userRepository from '../model/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export async function postSignUp(req, res, next) {
  //데이터 받아오기
  const { username, password, name, email, url } = req.body;
  // data 중복 찾아보고 거르기
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  //비번 해싱
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  // model에서 데이터 생성후 유저고유id를 넘겨받기
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  //고유 유저Id로 토큰 제작
  const token = createJwtToken(userId);
  //토큰과 유저이름 넘겨주기
  res.status(201).json({ token, username });
}

export async function login(req, res, next) {
  const { username, password } = req.body;
  //동일한 정보 가져와서 DB존재 여부 확인
  const user = await userRepository.findByUsername(username);
  if (!user) {
    res.status(401).json({ message: 'Invalid user or password' });
  }
  //암호 동일한지 파악
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  //로그인 검증시 아이디로 토큰 생성
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

export async function me(req, res, next) {
  //3중 검증
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).josn({ message: 'User not found' });
  }
  //동일 토큰 재전송
  res.status(200).json({ token: req.token, username: user.username });
}
