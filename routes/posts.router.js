const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth-middleware');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPostById);
router.post('/', authmiddleware, postsController.createPost);
router.put('/:postId', authmiddleware, postsController.updatePost);
router.delete('/:postId', authmiddleware, postsController.deletePost);

router.post('/:postId/like',authmiddleware, postsController.likePost);
router.get('/like',authmiddleware,postsController.likePostList);

module.exports = router;
