// routes/goods.js 라우트 생성
const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { User } = require("../models");
const { Comment } = require("../models");
const { Post } = require("../models");
const { Like } = require("../models");
const authmiddleware=require('../middlewares/auth-middleware')
const existBoard=require('../middlewares/existBoard')

//상세조회 - 댓글 목록
router.get("/:postId", async (req, res) => {
  const {postId} = req.params;
  // let comments=await Comment.find({}).select('-_id -postId -updatedAt -__v').sort('-createdAt');
  let comments=await Comment.findAll({
    attributes:['commentName','commentContent'],
    where:{postId},
    order:[['createdAt','desc']]
  });
  let post=res.locals.post
  return res.status(200).json({'post':post,'comments':comments});
});

//작성
router.post("/:postId/comment",existBoard,authmiddleware, async (req, res) => {
    const {postId} = req.params;
    const {commentContent} = req.body;
    const user=res.locals.user;
    try{  
      // var {commentId}=await Comment.findOne({}).select('-_id Id').sort('-commentId').exec();
      let findId=await Comment.findAll({
        attributes:['commentId'],
        where:{
          postId:postId
        },
        order:[['commentId','desc']],
        limit:1
      })
      var commentId=findId[0].dataValues.commentId+1
    }catch(TypeError){
      commentId=1;
    }
    if(commentContent==""){
      return res.status(400).send({
        errorMessage: "WRONG_NONE_CONTENT",
      });
    }
    // await Comment.create({ postId:Number(postId),'commentId':commentId, commentName, commentContent});
    await Comment.create({
      'postId':postId,'commentId':commentId,"commentName":user.dataValues.nickname,commentContent
    })

    return res.status(200).json({ result: "입력성공" });
});

//수정
router.put("/:postId/comment/:commentId",authmiddleware, async (req, res) => {
  const {postId} = req.params;
  const {commentId} = req.params;
  let body= req.body;
  if(body.commentContent==""){
    return res.status(400).send({
      errorMessage: "INSERT_CONTENT",
    });
  }
  // const comment  = await Comment.find({ postId,commentId });
  const comment  = await Comment.findAll({
    where:{
      postId:postId,
      commentId:commentId
    }
  })
  if(comment[0].dataValues.commentName!=res.locals.user.dataValues.nickname){
    return res.status(400).send({
      errorMessage: "NONE_OWNER",
    });
  }
  if (comment==null) {
    return res.status(400).send({
      errorMessage: "NONE_EXIST_COMMENT",
    });
  }
  // await Comment.updateOne({ postId: postId,commentId:commentId}, { $set:{commentContent } });
  await Comment.update(
    {commentContent:body.commentContent},
    {where: { 'postId':postId,commentId:commentId}}
  );
  return res.status(200).json({ result: true });
});
//삭제
router.delete("/:postId/comment/:commentId",authmiddleware, async (req, res) => {
    const {postId} = req.params;
    const {commentId} = req.params;
  // const exist = await Comment.findOne({"postId":postId,"commentId":commentId});
  const exist = await Comment.findAll({
    where:{
      postId:postId,
      commentId:commentId
    }
  })
  if (exist.length==0) {
    res.status(400).send({
      errorMessage: "NONE_EXIST_COMMENT",
    });
    return;
  }
  if(exist[0].dataValues.commentName!=res.locals.user.dataValues.nickname){
    res.status(400).send({
      errorMessage: "NONE_OWNER",
    });
    return;
  }
  // await Comment.deleteOne({ postId,commentId});
  await Comment.destroy({
    where:{
      postId:postId,
      commentId:commentId
    }
  })
  return res.status(200).json({ result: "success" });
});


module.exports = router;