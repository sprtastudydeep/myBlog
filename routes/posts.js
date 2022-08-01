const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { User } = require("../models");
const { Comment } = require("../models");
const { Post } = require("../models");
const { Like } = require("../models");
const comment = require('../models/comment');
const authmiddleware=require('../middlewares/auth-middleware')

//목록
router.get('/',async (req,res)=>{
  let posts= await Post.findAll({
    attributes:["postId","postTitle", "postName", "createdAt"],
    order:[['createdAt','desc']]
  });
      // await Post.find({}).select('postTitle postName createdAt').sort('-createdAt').exec();
  return res.status(200).json({posts:posts})
})
//작성
router.post("/",authmiddleware, async (req, res) => {
    //id 날짜는 알아서 할당한다.
    const user=res.locals.user;
    try{
      var postId=await Post.findAll({
        attributes:['postId'],
        order:[['postId','desc']],
        limit:1
      });
      // var {postId}=await Post.findOne({}).select('-_id postId').sort('-postId').exec();
      postId++;
    }catch(TypeError){
      postId=1;
    }
    //입력은 이름과 제목,내용만 받는다
    const {postTitle,postContent} = req.body;
    // await Post.create({'postId':postId,postTitle,postName,postPassword,postContent} );
    await Post.create({
      postTitle,"postName":user.dataValues.nickname,"postPassword":user.dataValues.password,postContent
    })
    return res.status(200).json({ result: "입력성공" });
});
//조회
router.get("/:postId", async (req, res, next) => {
  const {postId} = req.params;
  // const post=await Post.findOne({'postId':postId}).select('-_id -updatedAt -postPassword -__v').exec();
  const post=await Post.findAll({
    attributes:['postTitle', 'postName' ,'postContent','createdAt'],
    where:{'postId':postId},  
    limit:1
  })
  if(post==null || post.length==0){
    res.status(400).send({
      errorMessage: "NONE_EXIST_BOARD",
    });
    return;
  }
  res.locals.post={
    'postTitle':post[0].dataValues.postTitle,
    'postName':post[0].dataValues.postName ,
    'postContent':post[0].dataValues.postContent,
    'createdAt':post[0].dataValues.createdAt
  };
  next()
});
//수정
router.put("/:postId",authmiddleware, async (req, res) => {
  const {postId} = req.params;
  let body= req.body;
  if(body.postContent==""&&body.postTitle==""){
    return res.status(400).send({
      errorMessage: "INSERT_POSTCONTENT_OR_POSTTITLE",
    });
  }
  for(i in body){
    if(body[i]==""){
      delete body[i];
    }
  }
  // const post  = await Post.findOne({ 'postId':postId })
  const exists = await Post.findAll({
    attributes:['postPassword','postName'],
    where:{'postId':postId},
    limit:1
  }) 
  const user=res.locals.user;
  if(user.dataValues.nickname!=exists[0].dataValues.postName){
    return res.status(400).send({
      errorMessage: "WRONG_USER_BOARD",
    });
  }else if (exists==null) {
    return res.status(400).send({
      errorMessage: "NONE_EXIST_BOARD",
    });
  }else if(exists[0].dataValues.postPassword!=body.postPassword){
    return res.status(400).send({
      errorMessage: "WRONG_PASSWORD_INFO",
    });
  }
  // await Post.updateOne({ 'postId': postId}, { $set:body });
  await Post.update(
    body, 
    {where: { 'postId':postId}}
  );
  return res.status(200).json({ result: true });
});
//삭제
router.delete("/:postId",authmiddleware, async (req, res) => {
    const {postId} = req.params;
    const body = req.body;
  // const exists = await Post.findOne({"postId":postId});
  const user=res.locals.user;
  const exists = await Post.findAll({
    attributes:['postPassword','postName'],
    where:{'postId':postId},
    limit:1
  })
  if (exists==null) {
    res.status(400).send({
      errorMessage: "NONE_EXIST_BOARD",
    });
    return;
  }else if(body.postPassword!=exists[0].dataValues.postPassword||user.dataValues.nickname!=exists[0].dataValues.postName){
    res.status(400).send({
      errorMessage: "WRONG_PASSWORD_INFO_OR_NICKNAME_INFO",
    });
    return;
  }
  // await Post.deleteOne({ postId});
  // await Comment.deleteMany({'postId':postId})
  await Post.destroy({
    where:{postId}
  })
  await  Comment.destroy({
    where:{postId}
  })
  return res.status(200).json({ result: "success" });
});

module.exports = router;