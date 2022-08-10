const {Comment}=require('../models');

class commentRepository{
    maxId=async()=>{
        return await Comment.findOne({
            attributes:['commentId'],
            order:[['commentId','desc']],
        })
    }
    oneComment=async(commentId)=>{
        return await Comment.findOne({
            where:{
                commentId
            }
        })
    }
    getCommentById=async(postId)=>{
        return await Comment.findAll({
            attributes:[
                "commentId",
                "commentName",
                "commentContent",
                "createdAt"],
            where:{
                postId
            },
            order:[['createdAt','desc'],['commentId','desc']]
        })
    }
    createComment=async(postId,commentId,user,commentContent)=>{
        return await Comment.create({
            postId,commentId,"commentName":user.nickname,commentContent
        });
    }
    putComment=async(commentId,commentContent)=>{
        return await Comment.update(
            {commentContent:commentContent}, 
            {where: {
                'commentId':commentId
            }}
        );
    }
    deleteComment=async(commentId)=>{
        await Comment.destroy({
            where:{
                commentId
            }
        })
    }
    deletePostComment=async(postId)=>{
        await Comment.destroy({
            where:{
                postId
            }
        })
    }

}

module.exports=commentRepository