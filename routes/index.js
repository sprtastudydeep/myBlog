const express = require("express");
const router = express.Router();

const userRouter = require("./user.router");
const postRouter = require("./post.router");
const commentRouter = require("./comment.router");
const likeRouter = require("./like.router");

// http://localhost:8080/api
router.use("/user", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/likes", likeRouter);

module.exports = router;