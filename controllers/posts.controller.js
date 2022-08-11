const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts });
  };

  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);

    res.status(200).json({ data: post });
  };
  createPost = async (req, res, next) => {
    const { nickname, userId } = res.locals.user;
    const { title, content } = req.body;

    const createdPost = await this.postService.createPost(
      nickname,
      userId,
      title,
      content
    );
    res.status(200).json({ data: createdPost });
  };
  updatePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;

    const updatePost = await this.postService.updatePost(
      userId,
      postId,
      title,
      content
    );
    res.status(200).json({ data: updatePost });
  };
  deletePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const deletePost = await this.postService.deletePost(userId, postId);
    res.status(200).json({ data: deletePost });
  };
}

module.exports = PostsController;
