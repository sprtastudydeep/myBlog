const LikeRepository=require('../repositories/likes.repository')
const PostRepository = require('../repositories/posts.repositroy');
const PostService=require('./posts.service')
class LikeService{
    likeRepository=new LikeRepository();
    postRepository=new PostRepository();
    postService=new PostService();
    updateLike=async(postId,userId)=>{
        const post=await this.postService.existPost(postId);
        if(post===undefined){
            return 400;
        }
        const check=await this.likeRepository.getLike(postId,userId)
        if(check==undefined){
            await this.likeRepository.createLike(postId,userId);
            return 201;
        }else{
            await this.likeRepository.deleteLike(postId,userId);
            return 202;
        }
    }

    postLikeList=async(userId)=>{
        let posts=await this.postRepository.getAllPosts();
        let likes=await this.likeRepository.getAllLike();
        // 전체 게시판 중에 사용자가 좋아요한 postId와 같은 게시판만을 남긴다.
        let userLikes=likes.filter(like=>(like.userId==userId))
        posts=posts.filter(post=>{
            for(let like of userLikes){
                if(like.postId==post.postId){
                    return true;
                }
            }
            return false
        })
        // 사용자가 좋아요한 게시판에 좋아요개수를 넣는다.
        posts=posts.map(post=>{
            post=post.dataValues,
            post.like=likes.filter(like=>(
                like.postId==post.postId
            )).length
            return post
        })
        posts.sort((a,b)=>(b.like-a.like))
        return posts
    }
    
}

module.exports=LikeService;