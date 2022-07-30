// routes/goods.js 라우트 생성
const express = require('express');
const router = express.Router();
const post = require("../schemas/post");
const Comment = require("../schemas/comment");

//상세조회 - 댓글 목록
router.get("/:postId", async (req, res) => {
  let comments=await Comment.find({}).select('-_id -postId -updatedAt -__v').sort('-createdAt');
  res.json({'comments':comments});
});

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
    res.status(400).send({
      errorMessage: "NONE_EXIST_COMMENT",
    });
    return;
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
    res.status(400).send({
      errorMessage: "NONE_EXIST_COMMENT",
    });
    return;
  }
  await Comment.deleteOne({ postId,commentId});
  res.json({ result: "success" });
});


module.exports = router;