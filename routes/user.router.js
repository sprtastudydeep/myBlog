const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller')
const userController = new UserController();
const hasToken = require('../middlewares/token-middleware');
const auth = require('../middlewares/auth-middleware')

// http://localhost:8080/api/user

// 회원가입
router.post("/signup",hasToken,userController.signup)

//로그인
router.post("/login",hasToken,userController.login)

//로그 아웃
router.get("/logout",auth,userController.logout)

//회원 탈퇴
router.delete("/delete",auth,userController.deleteUser)


module.exports = router;