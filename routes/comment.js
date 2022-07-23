// routes/goods.js 라우트 생성
const express = require('express');
const router = express.Router();
const post = require("../schemas/post");
const Comment = require("../schemas/comment");


//작성
router.post("/:postId/comment", async (req, res) => {
    let curentId=1;
    const list=await Comment.find({})
    const {postId} = req.params;
    console.log(list)
    let max=0;
    for(let i in list){
        if(max<=list[i]['commentId']/1){
            max=list[i]['commentId']/1;
        }
    }
    if(max){
        curentId=max+1;
    }
    const { commentName, commentContent } = req.body;
    if(commentContent==""){
        return res.json({ success: false, errorMessage: "댓글 내용을 입력해주세요" });
    }
    await Comment.create({ postId:Number(postId),commentId:curentId, commentName, commentContent});

    res.json({ result: "입력성공" });
});
//수정
router.put("/:postId/:commentId", async (req, res) => {
  const {postId} = req.params;
  const {commentId} = req.params;
  const { commentName, commentContent} = req.body;
  const comment  = await Comment.find({ postId,commentId });
  if (!comment.length) {
    return res.json({ success: false, errorMessage: "존재하지 않는 게시판입니다." });
  }
  await Comment.updateOne({ postId: postId,commentId:commentId}, { $set:{ commentName, commentContent } });
  res.json({ result: true });
});
//삭제
router.delete("/:postId/:commentId", async (req, res) => {
    const {postId} = req.params;
    const {commentId} = req.params;
  const exists = await Comment.find({"postId":postId,"commentId":commentId});
  if (!exists.length) {
    return res.json({ success: false, errorMessage: "존재하지 않는 글입니다." });
  }
  await Comment.deleteOne({ postId,commentId});
  res.json({ result: "success" });
});


module.exports = router;