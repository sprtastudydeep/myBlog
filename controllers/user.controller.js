const UserService = require("../services/user.service");

module.exports = class UserController {
  userService = new UserService();

  signup = async (req, res, next) => {
    const { nickname, password, confirm } = req.body;

    const response = await this.userService.createUser(
      nickname,
      password,
      confirm
    );

    res
      .status(response.status)
      .json(response.message);
  };

  login = async (req, res, next) => {
    const { nickname, password } = req.body;

    const response = await this.userService.loginUser(nickname, password);
    res.cookie('Bearer',response.token,{maxAge: 180000})

    res
      .status(response.status)
      .json(response.message);
  };

  logout = async (req, res, next) => {
    await res.clearCookie("Bearer")
    res.status(201).json("로그아웃 성공")
  }

  deleteUser = async (req, res, next) => {
    const {password} = req.body;
    const {userId} = res.locals.user

    const response = await this.userService.deleteUser(userId,password)
    res.status(response.status).json(response.message)
  }
};
