const { Post,Like } = require('../models');

class PostRepository {
  findAllPost = async () => {
    const posts = await Post.findAll({order:[['createdAt','desc']]});

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
  
  findLikeList = async(userId) => {
    const posts = await Like.findAll({where: {userId}})
    return posts
  }
  findLikesNum = async(postId) => {
    const like = await Like.count({where:{postId}})
    return like
  }
  findLike = async(postId,userId) => {
    const post = await Like.findOne({where: {userId,postId}})
    return post
  }
  deleteLike = async(id) => {
    await Like.destroy({where: {id}})
    return
  }
  createLike = async(postId, userId) => {
    await Like.create({postId,userId})
    return
  }
}

module.exports = PostRepository;
