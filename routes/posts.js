const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { User } = require("../models");
const { Comment } = require("../models");
const { Post } = require("../models");
const { Like } = require("../models");


//목록
router.get('/',async (req,res)=>{
  let posts= await Post.findAll({
    attributes:["postTitle", "postName", "createdAt"]
  });
      // await Post.find({}).select('postTitle postName createdAt').sort('-createdAt').exec();
  return res.status(200).json({posts:posts})
})
//작성
router.post("/", async (req, res) => {
    //id 날짜는 알아서 할당한다.
  try{
    // var {postId}=await Post.findOne({}).select('-_id postId').sort('-postId').exec();
    var {postId}=await Post.find({
      attributes:[postId],
      where: { postId},
      order:['postId','desc']
    });
    postId++;
  }catch(TypeError){
    postId=1;
  }
  
    //입력은 이름과 제목,내용만 받는다
    const {postTitle,postName,postPassword,postContent} = req.body;
    // await Post.create({'postId':postId,postTitle,postName,postPassword,postContent} );
    await Post.create({
      'postId':postId,postTitle,postName,postPassword,postContent
    })
    return res.status(200).json({ result: "입력성공" });
});
//조회
router.get("/:postId", async (req, res) => {
  const {postId} = req.params;
  // const post=await Post.findOne({'postId':postId}).select('-_id -updatedAt -postPassword -__v').exec();
  // const post=await
  if(post==null){
    res.status(400).send({
      errorMessage: "NONE_EXIST_BOARD",
    });
    return;
  }
  // let comments=await Comment.find({}).select('-_id -postId -updatedAt -__v').sort('-createdAt');
  // let comments=await
  return res.status(200).json({ 'post':post,'comments':comments});
});
//수정
router.put("/:postId", async (req, res) => {
  const {postId} = req.params;
  const body= req.body;
  // const post  = await Post.findOne({ 'postId':postId })
  // const post  = await
  if (post==null) {
    res.status(400).send({
      errorMessage: "NONE_EXIST_BOARD",
    });
    return;
  }else if(post.postPassword!=body.postPassword){
    res.status(400).send({
      errorMessage: "WRONG_PASSWORD_INFO",
    });
    return;
  }
  // await Post.updateOne({ 'postId': postId}, { $set:body });
  // await
  return res.status(200).json({ result: true });
});
//삭제
router.delete("/:postId", async (req, res) => {
    const {postId} = req.params;
    const body = req.body;
  // const exists = await Post.findOne({"postId":postId});
  // const exists = await
  if (exists==null) {
    res.status(400).send({
      errorMessage: "NONE_EXIST_BOARD",
    });
    return;
  }else if(body.postPassword!=exists.postPassword){
    res.status(400).send({
      errorMessage: "WRONG_PASSWORD_INFO",
    });
    return;
  }
  // await Post.deleteOne({ postId});
  // await Comment.deleteMany({'postId':postId})
  // await 
  // await 
  return res.status(200).json({ result: "success" });
});

module.exports = router;