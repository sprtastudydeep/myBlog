// routes/goods.js 라우트 생성
const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { User } = require("../models");
const { Comment } = require("../models");
const { Post } = require("../models");
const { Like } = require("../models");

//상세조회 - 댓글 목록
router.get("/:postId", async (req, res) => {
  const {postId} = req.params;
  // let comments=await Comment.find({}).select('-_id -postId -updatedAt -__v').sort('-createdAt');
  let comments=await Comment.findAll({
    attributes:['commentName','commentContent'],
    where:{postId},
    order:[['createdAt','desc']],
    limit:1
  });
  console.log(1);
  let post=res.locals.post
  console.log(post)
  return res.status(200).json({'post':post,'comments':comments});
});

//작성
router.post("/:postId/comment", async (req, res) => {
    const {postId} = req.params;
    try{  
      // var {commentId}=await Comment.findOne({}).select('-_id Id').sort('-commentId').exec();
      var {commentId}=
      commentId++;
    }catch(TypeError){
      commentId=1;
    }
    console.log(commentId)
    const { commentName, commentContent } = req.body;
    if(commentContent==""){
      res.status(400).send({
        errorMessage: "WRONG_NONE_CONTENT",
      });
      return;
    }
    // await Comment.create({ postId:Number(postId),'commentId':commentId, commentName, commentContent});
    // await

    return res.status(200).json({ result: "입력성공" });
});

//수정
router.put("/:postId/:commentId", async (req, res) => {
  const {postId} = req.params;
  const {commentId} = req.params;
  const {commentContent} = req.body;
  // const comment  = await Comment.find({ postId,commentId });
  // const comment  = await
  if (!comment.length) {
    res.status(400).send({
      errorMessage: "NONE_EXIST_COMMENT",
    });
    return;
  }
  // await Comment.updateOne({ postId: postId,commentId:commentId}, { $set:{commentContent } });
  // await
  return res.status(200).json({ result: true });
});
//삭제
router.delete("/:postId/:commentId", async (req, res) => {
    const {postId} = req.params;
    const {commentId} = req.params;
  // const exist = await Comment.findOne({"postId":postId,"commentId":commentId});
  // const exist = await
  if (exist==null) {
    res.status(400).send({
      errorMessage: "NONE_EXIST_COMMENT",
    });
    return;
  }
  // await Comment.deleteOne({ postId,commentId});
  // await
  return res.status(200).json({ result: "success" });
});


module.exports = router;