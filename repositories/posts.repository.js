const { Post } = require('../models');

class PostRepository {
  findAllPost = async () => {
    const posts = await Post.findAll();

    return posts;
  };
  findPostById = async (postId) => {
    const post = await Post.findByPk(postId);

    return post;
  };
  createPost = async (nickname, userId, title, content) => {
    const createdPost = await Post.create({
      nickname,
      userId,
      title,
      content,
    });
    return createdPost;
  };
  updatePost = async (postId, title, content) => {
    const updatePost = await Post.update(
      { title, content },
      { where: { postId } }
    );

    return updatePost;
  };
  deletePost = async (postId) => {
    const deletePost = await Post.destroy({ where: { postId } });
    return deletePost;
  };
}

module.exports = PostRepository;
