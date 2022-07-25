const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId:{
      type:Number
    },
    commentId: {
    type: Number,
  },
  commentName:{
    type:String
  },
  commentContent:{
    type:String
  }
}, {timestamps:{
  createdAt:true
}});

module.exports = mongoose.model("Comment", commentSchema);