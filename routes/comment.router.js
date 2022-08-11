// routes/goods.js 라우트 생성
const express = require('express');
const router = express.Router();
const authmiddleware=require('../middlewares/auth-middleware')
const CommentController=require('../controllers/comments.controller');
const commentController=new CommentController();

//상세조회 - 댓글 목록
router.get("/:postId", commentController.getComment);

//작성
router.post("/:postId",authmiddleware,commentController.createComment)


//수정
router.put("/:commentId",authmiddleware,commentController.putComment)

//삭제
router.delete("/:commentId",authmiddleware,commentController.deleteComment)

module.exports = router;
