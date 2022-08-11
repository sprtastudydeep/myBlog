const { User } = require("../models");

module.exports = class UserRepository {

  findAllUser = async () => {
    const users = await User.findAll({
        order : [['createdAt','desc']]
    });

    return users;
  };

  findUserLogin = async (nickname, password) => {
    const user = await User.findOne({
        where:{nickname,password}
    });

    return user;
  };

  findUserById = async (userId) => {
    const user = await User.findOne({
        where:{userId}
    });

    return user;
  }

  findUserByNN = async (nickname) => {
    const user = await User.findOne({
        where:{nickname}
    });

    return user;
  }



  createUser = async (nickname, password) => {
    const user = await User.create({
        nickname,
        password
    });

    return user;
  };

  deleteUser = async (userId, password) => {
    await User.destroy({where:{userId,password}})
    return
  }
};
