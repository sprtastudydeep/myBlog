const express = require('express');
const router = express.Router();
const loginMiddleware = require('../middlewares/login-middleware');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPostById);
router.post('/', loginMiddleware, postsController.createPost);
router.put('/:postId', loginMiddleware, postsController.updatePost);
router.delete('/:postId', loginMiddleware, postsController.deletePost);

module.exports = router;