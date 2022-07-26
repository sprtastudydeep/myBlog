// routes/goods.js 라우트 생성
const express = require('express');
const router = express.Router();
const post = require("../schemas/post");
const Comment = require("../schemas/comment");


//작성
router.post("/:postId/comment", async (req, res) => {
    const {postId} = req.params;
    try{
      var {commentId}=await Comment.findOne({}).select('-_id Id').sort('-commentId').exec();
      commentId++;
    }catch(TypeError){
      commentId=1;
    }
    console.log(commentId)
    const { commentName, commentContent } = req.body;
    if(commentContent==""){
        return res.json({ success: false, errorMessage: "WRONG_NONE_CONTENT" });
    }
    await Comment.create({ postId:Number(postId),'commentId':commentId, commentName, commentContent});

    res.json({ result: "입력성공" });
});
//수정
router.put("/:postId/:commentId", async (req, res) => {
  const {postId} = req.params;
  const {commentId} = req.params;
  const {commentContent} = req.body;
  const comment  = await Comment.find({ postId,commentId });
  if (!comment.length) {
    return res.json({ success: false, message: "NONE_EXIST_COMMENT" });
  }
  await Comment.updateOne({ postId: postId,commentId:commentId}, { $set:{commentContent } });
  res.json({ result: true });
});
//삭제
router.delete("/:postId/:commentId", async (req, res) => {
    const {postId} = req.params;
    const {commentId} = req.params;
  const exist = await Comment.findOne({"postId":postId,"commentId":commentId});
  if (exist==null) {
    return res.json({ success: false, errorMessage: "NONE_EXIST_COMMENT" });
  }
  await Comment.deleteOne({ postId,commentId});
  res.json({ result: "success" });
});


module.exports = router;