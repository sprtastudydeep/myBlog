const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allPost.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };
  findPostById = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);

    return {
      findPost,
    };
  };
  createPost = async (nickname, userId, title, content) => {
    const createdPost = await this.postRepository.createPost(
      nickname,
      userId,
      title,
      content
    );
    return {
      createdPost,
    };
  };
  updatePost = async (userId, postId, title, content) => {
    const updatePost = await this.postRepository.findPostById(postId);
    if (!updatePost) {
      return '게시글이 존재하지 않습니다.';
    }
    if (userId !== updatePost.userId) {
      return '자신이 쓴 글만 수정 가능합니다.';
    }
    const postupdate = await this.postRepository.updatePost(
      postId,
      title,
      content
    );
    return { postupdate };
  };
  deletePost = async (userId, postId) => {
    const deletePost = await this.postRepository.findPostById(postId);
    if (!deletePost) {
      return '지우려고하는 게시글이 존재하지 않습니다.';
    }
    if (userId !== deletePost.userId) {
      return '자신이 쓴 글만 삭제 가능합니다.';
    }
    const postdelete = await this.postRepository.deletePost(postId);
    return { postdelete };
  };
}

module.exports = PostService;
