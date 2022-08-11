const {Like}=require('../models');

class likeRepository{
    getLike=async(postId,userId)=>{
        return await Like.findOne({
            where:{
              'postId':postId,
              'userId':userId
            },
          });
    }    
    getAllLike=async()=>{
        return await Like.findAll({
            attributes:[
                "postId","userId"
            ]
        })
    }
   
    createLike=async(postId,userId)=>{
        return await Like.create({
            'postId':postId,
            'userId':userId,
        })
    }
    deleteLike=async(postId,userId)=>{
        return await Like.destroy({
        where:{
              'postId':postId,
              'userId':userId
            }
        })
    }
    deletePostLike=async(postId)=>{
        return await Like.destroy({
        where:{
              'postId':postId
            }
        })
    }
}

module.exports=likeRepository