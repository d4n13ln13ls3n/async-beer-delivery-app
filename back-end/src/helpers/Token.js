require('dotenv/config');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const jwtOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

class Token {
  static create(payload) {
    const token = jwt.sign(payload, jwtSecret, jwtOptions);

    return token;
  }

  static validate(token) {
    const payload = jwt.verify(token, jwtSecret);

    return payload;
  }
}

module.exports = Token;
