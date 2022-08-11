const express = require('express');
const router = express.Router();
const {
  Post,
  Comment,
  Like
}=require('../models');
const authmiddleware=require('../middlewares/auth-middleware')
const existBoard=require('../middlewares/existBoard')
const PostsController = require('../controllers/posts.controller');
const postController=new PostsController();

//목록
router.get('/',postController.getAllPosts)
  
//작성
router.post("/",authmiddleware,postController.createPost)
//좋아요 조회
router.get("/like",authmiddleware,postController.likePost);
//조회
router.get("/:postId", postController.getPost)
//수정
router.put("/:postId",authmiddleware,postController.putPost);
//삭제
router.delete("/:postId",authmiddleware,postController.deletePost);

//좋아요
router.put("/:postId/like",authmiddleware,postController.updateLike)
//좋아요 목록

module.exports = router;