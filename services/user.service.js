const UserRepository = require("../repositories/user.repository");
const Key = require("../config/secretKey");
const jwt = require("jsonwebtoken");

module.exports = class UserService {
  userRepository = new UserRepository();

  loginUser = async (nickname, password) => {
    if (!nickname || !password) {
      return { status: 400, message: "Input value is empty" };
    }

    const loginUser = await this.userRepository.findUserLogin(
      nickname,
      password
    );
    if (!loginUser) {
      return { status: 400, message: "Invalid nickname or password" };
    }
    
    const token = jwt.sign({userId : loginUser.userId}, Key.secretKey)
    return { status: 201, message: '로그인 성공' , token};
  };

  createUser = async (nickname, password, confirm) => {
    if (!nickname || !password || !confirm) {
      return { status: 400, message: "Input value is empty" };
    }

    const checkNickname = /^[A-Za-z0-9]{3,20}$/.test(nickname);
    if (!checkNickname) {
      return { status: 400, message: "Invalid format of nickname" };
    } else if (password.length < 4) {
      return { status: 400, message: "Invalid format of password" };
    }

    const existsNickname = await this.userRepository.findUserByNN(nickname);
    console.log(existsNickname)
    if (existsNickname) {
      return { status: 400, message: "Already exists nickname" };
    }

    if (password.includes(nickname)) {
      return { status: 400, message: "Password with nickname" };
    }

    if (password !== confirm) {
      return { status: 400, message: "Invalid confirmation value of password" };
    }

    await this.userRepository.createUser(
      nickname,
      password
    );


    return { status: 201, message: '회원 가입 성공' };
  };

  deleteUser = async (userId, password) =>{
    if (!userId || !password) {
      return { status: 400, message: "Input value is empty" };
    }

    const deleteUser = await this.userRepository.findUserById(userId)
    if(deleteUser.password !== password){
      return {status: 400, message: "Invalid password"}
    }

    await this.userRepository.deleteUser(userId, password)
    return {status: 200, message: '회원 삭제 성공'}
  };
};
