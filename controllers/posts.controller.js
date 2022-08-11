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
    const { nickname } = res.locals.user;
    const postName = nickname
    const { postTitle, postContent } = req.body;

    const createdPost = await this.postService.createPost(
      postName,
      postTitle,
      postContent,
    );
    res.status(200).json({ data: createdPost });
  };
  updatePost = async (req, res, next) => {
    const { nickname } = res.locals.user;
    const postName = nickname
    const { postId } = req.params;
    const { postTitle, postContent } = req.body;

    const updatePost = await this.postService.updatePost(
      postId,
      postTitle,
      postContent,
      postName
    );
    res.status(200).json({ data: updatePost });
  };
  deletePost = async (req, res, next) => {
    const { nickname } = res.locals.user;
    const postName = nickname
    const { postId } = req.params;

    const deletePost = await this.postService.deletePost(postName, postId);
    res.status(200).json({ data: deletePost });
  };
  
  likePostList = async (req, res, next) => {
    const {userId} = res.locals.user;

    const response = await this.postService.likePostList(userId);
    res.status(response.data).json(response.data);
  };

  likePost = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    const response = await this.postService.likePost(postId, userId);
    res.status(response.status).json(response.messege);
  };
}
}

module.exports = PostsController;
