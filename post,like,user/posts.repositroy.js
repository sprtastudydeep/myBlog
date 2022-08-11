const {Post} =require('../models')

require("dotenv").config();
class PostRepository{
    getAllPosts=async()=>{
        //일련번호,제목,작성자,작성시간을 작성시간기준으로 내림차순으로 얻는다.
        let posts= await Post.findAll({
            attributes:["postId","postTitle", "postName", "createdAt"],
            order:[['createdAt','desc']]
        });
        return posts
    }
    getPost=async(postId)=>{
        const post = await Post.findOne({
            attributes:["postId","postTitle", "postName", "createdAt","postContent"],
            where:{postId},
        })
        return post
    }
    createPost=async(postTitle,postContent,user)=>{
        return await Post.create({
            postTitle,"postName":user.nickname,"postPassword":user.password,postContent
        });
    }
    putPost=async(postId,postTitle,postContent)=>{
        return await Post.update(
            {postTitle:postTitle,postContent:postContent}, 
            {where: { 'postId':postId}}
        );
    }
    deletePost=async(postId)=>{
        return await Post.destroy({
            where:{postId}
        })
    }
}

module.exports=PostRepository