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

  static async getAllSellers(_req, res) {
    const sellers = await UserService.getAllSellers();
    
    return res.status(200).json(sellers);
  }

  static async getAllCustomersAndUsers(req, res) {
    const { role } = req.user;

    const users = await UserService.getAllCustomersAndUsers(role);

    return res.status(200).json(users);
  }
}

module.exports = UserController;
