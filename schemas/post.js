const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postId:{
        type:Number,
        required: true,
        unique: true
    },
    postTitle:{
        type:String
    },
    postName:{
        type:String
    },
    postDate:{
        type:Date
    },
    postPassword:{
        type:String
    },
    postContent:{
        type:String
    }
}, {timestamps:{
    createdAt:true
  }});

module.exports = mongoose.model("Post", postSchema);