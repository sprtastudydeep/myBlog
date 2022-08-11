const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    let posts = []
    for(let i in allPost){
      const post = allPost[i].dataValues;
      const likes = await this.postRepository.findLikesNum(post.postId)
      const postInfo = {
        postId: post.postId,
        postName: post.postName,
        postTitle: post.postTitle,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes
      };
      posts.push(postInfo)
    }
    return posts
  };
  findPostById = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);
    const likes = await this.postRepository.findLikesNum(postId)

    return {findPost,likes}
  };
  createPost = async (postName, postTitle, postContent) => {
    const createdPost = await this.postRepository.createPost(
      postName,
      postTitle,
      postContent
    );
    return {
      createdPost,
    };
  };
  updatePost = async (postId, postTitle, postContent, postName) => {
    const updatePost = await this.postRepository.findPostById(postId);
    if (!updatePost) {
      return '게시글이 존재하지 않습니다.';
    }
    if (postName !== updatePost.postName) {
      return '자신이 쓴 글만 수정 가능합니다.';
    }
    const postupdate = await this.postRepository.updatePost(
      postId,
      postTitle,
      postContent,
      postName
    );
    return { postupdate };
  };
  deletePost = async (postName,postId) => {
    const deletePost = await this.postRepository.findPostById(postId);
    
    if (!deletePost) {
      return '지우려고하는 게시글이 존재하지 않습니다.';
    }
    if (postName !== deletePost.postName) {
      return '자신이 쓴 글만 삭제 가능합니다.';
    }
    const postdelete = await this.postRepository.deletePost(postId);
    return { postdelete };
  };
  
  likePost = async (postId, userId) => {
    const post = await this.postRepository.findPostById(postId);
    if (!post) {
      return { status: 400, messege: "Invalid postId" };
    }

    const existLike = await this.postRepository.findLike(postId, userId);
    if (existLike) {
      await this.postRepository.deleteLike(existLike.id);
      return { status: 201, messege: "좋아요 취소" };
    } else {
      await this.postRepository.createLike(postId, userId);
      return { status: 201, messege: "좋아요 성공" };
    }
  };

  likePostList = async (userId) => {
    const likePostList = await this.postRepository.findLikeList(userId);

    const posts = likePostList.map(async (p) => {
      const post = await this.postRepository.findPostById(p.postId);
      const likes = await this.postRepository.findLikesNum(p.postId);
      return {
        postId: post.postId,
        postTitle: post.postTitle,
        postName: post.postName,
        likes,
      };
    });
    const sortingPosts = posts.sort((a, b) => {
      return b.likes - a.likes;
    });
    return { status: 200, data: sortingPosts };
  };
}

module.exports = PostService;
