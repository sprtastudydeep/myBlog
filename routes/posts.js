// routes/goods.js 라우트 생성
const express = require('express');
const router = express.Router();
const Post = require("../schemas/post");
const Comment = require("../schemas/comment");

//목록
router.get('/',async (req,res)=>{
    let posts= 
        await Post.find({}).select('postTitle postName createdAt').sort('-createdAt').exec();
    return res.json({posts:posts})
})
//작성
router.post("/", async (req, res) => {
    //id 날짜는 알아서 할당한다.
  try{
    var {postId}=await Post.findOne({}).select('-_id postId').sort('-postId').exec();
    postId++;
  }catch(TypeError){
    postId=1;
  }
  
    console.log(postId)
    //입력은 이름과 제목,내용만 받는다
    const {postTitle,postName,postPassword,postContent} = req.body;
    await Post.create({'postId':postId,postTitle,postName,postPassword,postContent} );
    res.json({ result: "입력성공" });
});
//조회
router.get("/:postId", async (req, res) => {
  const {postId} = req.params;
  const post=await Post.findOne({'postId':postId}).select('-_id -updatedAt -postPassword -__v').exec();
  if(post==null){
    return res.json({ success: false, Message: "NONE_EXIST_BOARD" });
  }
  let comments=await Comment.find({}).select('-_id -postId -updatedAt -__v').sort('-createdAt');
  res.json({ 'post':post,'comments':comments});
});
//수정
router.put("/:postId", async (req, res) => {
  const {postId} = req.params;
  const body= req.body;
  const post  = await Post.findOne({ 'postId':postId })
  if (post==null) {
    return res.json({ success: false, errorMessage: "NONE_EXIST_BOARD" });
  }else if(post.postPassword!=body.postPassword){
    return res.json({ success: false, errorMessage: "WRONG_PASSWORD_INFO" });
  }
  await Post.updateOne({ 'postId': postId}, { $set:body });
  res.json({ result: true });
});
//삭제
router.delete("/:postId", async (req, res) => {
    const {postId} = req.params;
    const body = req.body;
  const exists = await Post.findOne({"postId":postId});
  if (exists==null) {
    return res.json({ success: false, errorMessage: "NONE_EXIST_BOARD" });
  }else if(body.postPassword!=exists.postPassword){
    return res.json({ success: false, errorMessage: "WRONG_PASSWORD_INFO" });
  }
  await Post.deleteOne({ postId});
  await Comment.deleteMany({'postId':postId})
  res.json({ result: "success" });
});

module.exports = router;