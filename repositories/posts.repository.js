>>>HEAD
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
  createPost = async (postName, postTitle, postContent) => {
    const createdPost = await Post.create({
      postName,
      postTitle,
      postContent,
    });
    return createdPost;
  };
  updatePost = async (postId, postTitle, postContent) => {
    const updatePost = await Post.update(
      { postTitle, postContent },
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
