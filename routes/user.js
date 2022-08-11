const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth-middleware');
const userController=new UserController();

router.get("/",authMiddleware,userController.checkUser);

//로그인 ,토큰 생성
router.post("/login", userController.loginUser);

//회원가입
router.post("/signup",userController.signupUser)

module.exports = router;