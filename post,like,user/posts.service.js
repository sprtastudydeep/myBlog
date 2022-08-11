const PostRepository = require('../repositories/posts.repositroy');
const CommentRepository=require('../repositories/comments.repositroy');
const LikeRepository=require('../repositories/likes.repository')

class PostService{
    constructor(){
        console.log("service")
    }
    postRepository= new PostRepository();
    commentRepository=new CommentRepository();
    likeRepository=new LikeRepository();
    getAllPosts=async()=>{
        let posts=await this.postRepository.getAllPosts();
        let likes=await this.likeRepository.getAllLike();
        posts=posts.map(post=>{
            post=post.dataValues,
            post.like=likes.filter(like=>(
                like.postId==post.postId
            )).length
            return post
        })
        return posts;
    }
    existPost=async(postId)=>{
        const post=await this.postRepository.getPost(postId);
        if (post===null) {
            return;
        }else{
            return post;
        }
    }
    getPost=async(postId)=>{
        const post=await this.existPost(postId);
        if(post===undefined){
            return 400;
        }
        let likes=await this.likeRepository.getAllLike();
        post.like=likes.filter(like=>(
            like.postId==postId
        )).length
           
        return post
    }
    createPost=async(postTitle,postContent,user)=>{
        let create=await this.postRepository.createPost(postTitle,postContent,user);
        return create;
    }
    putPost=async(postId,postTitle,postContent,user)=>{
        const post=await this.existPost(postId);
        if(post===undefined){
            return 400;
        }
        if(user.nickname!=post.postName){
            return 401;
        }
        const edit=await this.postRepository.putPost(postId,postTitle,postContent);
        console.log(this.cd+"putpost")
        return edit;
    }
    deletePost=async(postId,user)=>{
        const post=await this.existPost(postId);
        if(user.nickname!=post.postName){
            return 400;
        }
        const deletePostData=await this.postRepository.deletePost(postId);
        const deleteComment=await this.commentRepository.deletePostComment(postId);
        const deleteLike=await this.likeRepository.deletePostLike(postId);
        return deletePostData;
    }
}

module.exports=PostService