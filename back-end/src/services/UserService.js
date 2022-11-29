import { User } from "../database/models";
import HttpErrorHandler from "../middlewares/errorHandler/HttpErrorHandler";
import tokenHelper from '../helpers/Token';

export default class UserService {
  static async login(email, password) {
    const user = await User.findOne({
      where: { email, password },
      attributes: { exclude: ["password"] },
    });

    if (!user) throw new HttpErrorHandler(404, 'User not found');

    const payload = user.dataValues;

    const token = tokenHelper.create(payload);

    return { token };
  }
}
