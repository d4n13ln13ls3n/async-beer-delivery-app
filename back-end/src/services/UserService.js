const { User } = require("../database/models");
const HttpErrorHandler = require("../middlewares/errorHandler/HttpErrorHandler");
const tokenHelper = require("../helpers/Token");
const md5 = require('md5');

class UserService {
  static async login({ email, password }) {
    const hashedPassword = md5(password);

    const user = await User.findOne({
      where: { email, password: hashedPassword },
      attributes: { exclude: ["password"] },
    });

    if (!user) throw new HttpErrorHandler(404, "User or password not found");

    const payload = user.dataValues;

    const token = tokenHelper.create(payload);

    return { ...payload, token };
  }
}

module.exports = UserService;
