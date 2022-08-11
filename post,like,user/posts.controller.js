const PostService=require('../services/posts.service');
const LikeService=require('../services/likes.service')

class PostsController{
    constructor(){
        console.log("controller")
    }
    postService=new PostService();
    likeService=new LikeService();
    getAllPosts=async(req,res,next)=>{
        const getAllPosts=await this.postService.getAllPosts();
        return res.status(200).json({ data: getAllPosts });
    }

    getPost=async(req,res,next)=>{
        const {postId}=req.params
        const getPost=await this.postService.getPost(postId);
        if(getPost>=400){
            return res.status(getPost).send({
                errorMessage: "NONE_EXIST_BOARD",
            });
        }
        res.locals.post={
            'postTitle':getPost.postTitle,
            'postName':getPost.postName ,
            'postContent':getPost.postContent,
            'createdAt':getPost.createdAt,
            'like':getPost.like
        };
        next()
    }
    
    createPost=async(req,res,next)=>{
        const {postTitle,postContent}=req.body;
        const user=res.locals.user
        const createPostData= await this.postService.createPost(postTitle,postContent,user);
        return res.status(200).json({ data: createPostData });
    }

    putPost=async(req,res,next)=>{
        const {postId}=req.params
        const {postTitle,postContent}=req.body;
        let body= req.body;
        const user=res.locals.user;
        if(body.postContent==""&&body.postTitle==""){
          return res.status(400).send({
            errorMessage: "INSERT_POSTCONTENT_OR_POSTTITLE",
          });
        }
        for(let i in body){
          if(body[i]==""){
            delete body[i];
          }
        }
        const putPostData=await this.postService.putPost(postId,postTitle,postContent,user);
        if(putPostData>=400){
            return res.status(putPostData).json("error");
        }else if(putPostData){
            return res.status(200).json({ data: "수정완료" });
        }

    }
    
    deletePost=async(req,res,next)=>{
        const user=res.locals.user;
        const {postId}=req.params
        const deletePostData=await this.postService.deletePost(postId,user);
        if(deletePostData>=400){
            return res.status(deletePostData).json("error");
        }else if(deletePostData){
            return res.status(200).json({data:"삭제완료"})
        }
    }

    likePost=async(req,res)=>{
        const user=res.locals.user;
        const likePost=await this.likeService.postLikeList(user.userId);
        return res.status(200).json({posts:likePost});
    }

    updateLike=async(req,res,next)=>{
        const user=res.locals.user;
        const {postId}=req.params
        const result=await this.likeService.updateLike(postId,user.userId);
        if(result>=400){
            return res.status(result).json("error");
        }else if(result==201){
            return res.status(result).json("create");
        }else if(result==202){
            return res.status(result).json("delete");
        }
    }
}   

module.exports=PostsController;