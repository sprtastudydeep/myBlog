const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { User } = require("../models");
const { Comment } = require("../models");
const { Post } = require("../models");
const { Like } = require("../models");
const jwt=require('jsonwebtoken');

//로그인 ,토큰 생성
router.post("/", async (req, res) => {
    const body=req.body;
    const user=await User.findAll({
        where:{
            "nickname":body.nickname,
            "password":body.password
        }
    });
    if(!body.nickname||user.length==0){
        return res.status(400).send("사용자ID 또는 암호가 올바르지 않습니다.") 
    }
    const token=jwt.sign({ userId: user[0].dataValues.userId }, "boardkey")
    res.cookie('Bearer',token,{maxAge: 100000})
    res.send({
        token:token,
    });
});

//회원가입
router.post("/signup", async (req, res) => {
    const body=req.body;
    if(body.password!=body.currentpw){
        return res.status(400).send("message:NONE_CURRENT_PW")
    }
    const exist=await User.findAll({
        where:{
            "nickname":body.nickname
        }
    });
    if(exist.length!=0){
        return res.status(400).send("message:EXEIST_NICKNAME")
    }
    if(body.nickname.length>=3 && (/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g).test(body.nickname)){
        return res.status(400).send("message:WRONG_NICKNAME")
    }else if(body.password.length>=4 && body.password.includes(body.nickname)){
        return res.status(400).send("message:WRONG_PASSWORD")
    }
    await User.create({
        "nickname":body.nickname, "password":body.password
    })
   
    res.status(201).send("가입성공");
});



module.exports = router;