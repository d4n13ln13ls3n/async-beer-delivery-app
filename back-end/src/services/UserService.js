const { User } = require("../database/models");
const HttpErrorHandler = require("../middlewares/errorHandler/HttpErrorHandler");
const tokenHelper = require("../helpers/Token");

class UserService {
  static async login(email, password) {
    const user = await User.findOne({
      where: { email, password },
      attributes: { exclude: ["password"] },
    });

    if (!user) throw new HttpErrorHandler(404, "User not found");

    const payload = user.dataValues;

    const token = tokenHelper.create(payload);

    return { token };
  }
}

module.exports = UserService;
