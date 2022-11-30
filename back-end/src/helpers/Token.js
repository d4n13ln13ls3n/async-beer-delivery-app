require("dotenv/config");
const jwt = require("jsonwebtoken");
const fs = require("fs");

class Token {
  static jwtOptions = {
    algorithm: "HS256",
    expiresIn: "1d",
  };
  static jwtSecret = fs.readFileSync("jwt.evaluation.key", "utf-8");

  static create(payload) {
    const token = jwt.sign(payload, Token.jwtSecret, Token.jwtOptions);

    return token;
  }

  static validate(token) {
    const payload = jwt.verify(token, Token.jwtSecret);

    return payload;
  }
}

module.exports = Token;
