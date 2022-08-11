const CommentRepository=require('../repositories/comments.repositroy');

class commentService{
    commentRepository=new CommentRepository();
    existComment=async(commentId)=>{
        const comment=await this.commentRepository.oneComment(commentId)
        return comment;
    }
    getCommentId=async(postId)=>{
        const comments=await this.commentRepository.getCommentById(postId)
        return comments
    }
    createComment=async(postId,user,commentContent)=>{
        try{  
            let findId=await this.commentRepository.maxId()
            var commentId=findId.commentId+1
        }catch(TypeError){
            commentId=1;
        }
        const create=await this.commentRepository.createComment(postId,commentId,user,commentContent)
        return create;
    }
    putComment=async(commentId,commentContent,user)=>{
        const comment=await this.existComment(commentId);
        if(comment===undefined||null){
            return 400;
        }else if(user.nickname!=comment.dataValues.commentName){
            return 401;
        }
        const put=await this.commentRepository.putComment(commentId,commentContent);
        return put;
    }
    deleteComment=async(commentId,user)=>{
        const comment=await this.existComment(commentId);
        if(comment===undefined||comment===null){
            return 400;
        }else if(user.nickname!=comment.commentName){
            return 401;
        }
        const deleteComment=await this.commentRepository.deleteComment(commentId);
        return deleteComment;
    }

}

module.exports=commentService