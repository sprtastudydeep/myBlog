const CommentService=require('../services/comments.service')

class CommentController{
    commentService=new CommentService();
    getComment=async(req,res)=>{
        const {postId}=req.params
        const service = await this.commentService.getCommentId(postId);
        return res.status(200).json({
            comment:service
        })
    }
    createComment=async(req,res)=>{
        const {postId}=req.params
        const user=res.locals.user
        const {commentContent}=req.body;
        const service=await this.commentService.createComment(postId,user,commentContent)
        return res.status(200).json({
            comment:service
        })
    }
    putComment=async(req,res)=>{
        const {commentId}=req.params
        const user=res.locals.user
        const {commentContent}=req.body;
        const service=await this.commentService.putComment(commentId,commentContent,user)
        if(service>=400){
            return res.status(service).json({data:"error"});
        }
        return res.status(200).json({
            Message:true
        })
    }
    deleteComment=async(req,res)=>{
        const {commentId}=req.params
        const user=res.locals.user
        const service=await this.commentService.deleteComment(commentId,user)
        if(service>=400){
            return res.status(service).json({data:"error"});
        }
        return res.status(200).json({
            comment:service
        })
    }


}

module.exports=CommentController