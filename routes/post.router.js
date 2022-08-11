const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { User } = require("../models");
const { Comment } = require("../models");
const { Post } = require("../models");
const { Like } = require("../models");
const comment = require('../models/comment');
const authmiddleware=require('../middlewares/auth-middleware')
const existBoard=require('../middlewares/existBoard');
const { BOOLEAN } = require('sequelize');
//목록
router.get('/',async (req,res)=>{
  let posts= await Post.findAll({
    attributes:["postId","postTitle", "postName", "createdAt"],
    order:[['createdAt','desc']]
  });
      // await Post.find({}).select('postTitle postName createdAt').sort('-createdAt').exec();
  return res.status(200).json({posts:posts});
})
//작성
router.post("/",authmiddleware, async (req, res) => {
    //id 날짜는 알아서 할당한다.
    const user=res.locals.user;
    //입력은 이름과 제목,내용만 받는다
    const {postTitle,postContent} = req.body;
    // await Post.create({'postId':postId,postTitle,postName,postPassword,postContent} );
    await Post.create({
      postTitle,"postName":user.dataValues.nickname,"postPassword":user.dataValues.password,postContent
    })
    return res.status(200).json({ result: "입력성공" });
});
//조회
router.get("/:postId",existBoard, async (req, res, next) => {
  // const post=await Post.findOne({'postId':postId}).select('-_id -updatedAt -postPassword -__v').exec();
  const exists = res.locals.exists
  const like=await Like.count({
    where:{
      postId:exists.postId
    }
  })
  res.locals.post={
    'postTitle':exists.postTitle,
    'postName':exists.postName ,
    'postContent':exists.postContent,
    'createdAt':exists.createdAt,
    'like':like
  };
  next();
});
//수정
router.put("/:postId",existBoard,authmiddleware, async (req, res) => {
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
  const exists = res.locals.exists
  
  const user=res.locals.user;
  if(user.dataValues.nickname!=exists.postName){
    return res.status(400).send({
      errorMessage: "WRONG_USER_BOARD",
    });
  }
  // await Post.updateOne({ 'postId': postId}, { $set:body });
  await Post.update(
    {postTitle:body.postTitle,postContent:body.postContent}, 
    {where: { 'postId':postId}}
  );
  return res.status(200).json({ result: true });
});
//삭제
router.delete("/:postId",existBoard,authmiddleware, async (req, res) => {
  // const exists = await Post.findOne({"postId":postId});
  const user=res.locals.user;
  const exists=res.locals.exists;
  if(user.dataValues.nickname!=exists.postName){
    res.status(400).send({
      errorMessage: "WRONG_PASSWORD_INFO_OR_NICKNAME_INFO",
    });
    return;
  }
  // await Post.deleteOne({ postId});
  // await Comment.deleteMany({'postId':postId})
  await Post.destroy({
    where:{postId:exists.postId}
  })
  await  Comment.destroy({  
    where:{"postId":exists.postId}
  })
  await Like.destroy({
    where:{postId:exists.postId}
  })
  return res.status(200).json({ result: "success" });
});

//좋아요
router.put("/:postId/like",existBoard,authmiddleware,async(req,res,next)=>{  
  const {postId} = req.params;
  const user=res.locals.user;
  const exists = await Like.findAll({
    where:{
      'postId':postId,
      'userId':user.dataValues.userId
    },
    limit:1
  });
  if(exists.length==0){
    await Like.create({
      'postId':postId,
      'userId':user.dataValues.userId,
    })
  }else{
    await Like.destroy(
      {where:{
        'postId':postId,
        'userId':user.dataValues.userId
      }}
    )
  }
  return res.status(200).send("좋아요")
})
//좋아요 목록
router.get("/like/list",authmiddleware,async(req,res,next)=>{
  const user=res.locals.user
  let likes=await Like.findAll({
    attributes:[
      "postId","userId"
    ],
    where:{
      userId:user.userId
    }
  });
  let count=await Like.count({
    attributes:[
      "postId"
    ],
    group:'postId'
  });
  let posts=[];
  for(let i=0;i<likes.length;i++){
    let post= await Post.findAll({
      attributes:["postId","postTitle", "postName", "createdAt"],
      where:{
        "postId":likes[i].postId
      },
      limit:1
    });
    let c=0;
    for(let j=0;j<count.length;j++){
      if(count[j].postId==likes[i].postId){
        c=count[j].count;
        break;
      }
    }
    post=post[0].dataValues
    post.like=c;
    posts.push(post)
  }
  posts.sort((a,b)=>(b.like-a.like))
      // await Post.find({}).select('postTitle postName createdAt').sort('-createdAt').exec();
  return res.status(200).json({posts:posts});
});

module.exports = router;