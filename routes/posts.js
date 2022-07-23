// routes/goods.js 라우트 생성
const express = require('express');
const router = express.Router();
const Post = require("../schemas/post");
const Comment = require("../schemas/comment");

//목록
router.get('/',async (req,res)=>{
    let list= 
        await Post.find({},{'_id':false,'postId':false,'postPassword':false,'postContent':false,"__v":false});
        list=list.reverse()
    return res.json({posts:list})
})
//작성
router.post("/", async (req, res) => {
    //id 날짜는 알아서 할당한다.
    let curentId=1;
    const list=await Post.find({})
    let max=0;
    for(let i in list){
        if(max<=list[i]['postId']/1){
            max=list[i]['postId']/1;
        }
    }
    if(max){
        curentId=max+1;
    }
    const postDate=new Date();

    //입력은 이름과 제목,내용만 받는다
    const { postTitle, postName, postContent,postPassword } = req.body;
    const createdPosts = await Post.create({ postId:curentId, postTitle, postName, postPassword,postDate,postContent  });

    res.json({ result: "입력성공" });
});
//조회
router.get("/:postId", async (req, res) => {
  const serch = req.params;
  const list=await Post.findOne({postId:serch.postId/1},{"_id":false,"postPassword":false,"__v":false});
  if(list==null){
    return res.json({ success: false, errorMessage: "존재하지 않는 게시판입니다." });
  }
    let comments=await Comment.find({},{'_id':false,"__v":false});
    comments=comments.reverse()
    res.json({ post:list,comments:comments});
});
//수정
router.put("/:postId", async (req, res) => {
  const {postId} = req.params;
  const { postTitle, postContent,postPassword } = req.body;
  const post  = await Post.find({ postId })
  if (!post.length) {
    return res.json({ success: false, errorMessage: "존재하지 않는 게시판입니다." });
  }else if(postPassword!=post[0].postPassword){
    return res.json({ success: false, errorMessage: "비밀번호가 틀렸습니다." });
  }
  await Post.updateOne({ postId: postId}, { $set:{ postTitle, postContent,postPassword } });
  res.json({ result: true });
});
//삭제
router.delete("/:postId", async (req, res) => {
    const {postId} = req.params;
    const {postPassword } = req.body;
  const exists = await Post.find({"postId":postId});
  if (!exists.length) {
    return res.json({ success: false, errorMessage: "존재하지 않는 글입니다." });
  }else if(postPassword!=exists[0].postPassword){
    return res.json({ success: false, errorMessage: "비밀번호가 틀렸습니다." });
  }
  await Post.deleteOne({ postId});
  res.json({ result: "success" });
});

module.exports = router;