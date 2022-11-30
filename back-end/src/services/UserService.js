const md5 = require('md5');
const { User } = require('../database/models');
const HttpErrorHandler = require('../middlewares/errorHandler/HttpErrorHandler');
const tokenHelper = require('../helpers/Token');

class UserService {
  static async login({ email, password }) {
    const hashedPassword = md5(password);

    const user = await User.findOne({
      where: { email, password: hashedPassword },
      attributes: { exclude: ['password'] },
    });

    if (!user) throw new HttpErrorHandler(404, 'User or password not found');

    const payload = user.dataValues;

    const token = tokenHelper.create(payload);

    return { ...payload, token };
  }

  static async register({ name, email, password }) {
    const existingName = await User.findOne({
      where: { name },
    });

    if (existingName) throw new HttpErrorHandler(409, 'Name already registered');

    const existingEmail = await User.findOne({
      where: { email },
    });

    if (existingEmail) throw new HttpErrorHandler(409, 'Email already registered');

    const hashedPassword = md5(password);

    await User.create({ name, email, password: hashedPassword, role: 'customer' });
  }
}

module.exports = UserService;
