import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

export default class Token {
  static jwtSecret = process.env.JWT_SECRET || 'secret_key';
  static jwtOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };

  static create(payload) {
    const token = jwt.sign(payload, Token.jwtSecret, Token.jwtOptions);

    return token;
  }

  static validate(token) {
    const payload = jwt.verify(token, Token.jwtSecret);

    return payload;
  }
}