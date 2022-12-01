const Token = require('../helpers/Token');
const HttpErrorHandler = require('./errorHandler/HttpErrorHandler');

  const auth = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    throw new HttpErrorHandler(401, 'Token not found');
  }
  const decodedUser = Token.validate(token);
  req.user = decodedUser;
  next();
};

module.exports = auth;