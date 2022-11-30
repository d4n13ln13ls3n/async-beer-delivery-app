const UserService = require('../services/UserService');

class UserController {
  static async login(req, res) {
    const result = await UserService.login(req.body);

    return res.status(200).json(result);
  }

  static async register(req, res) {
    const newUser = await UserService.register(req.body);

    return res.status(201).json(newUser);
  }
}

module.exports = UserController;
