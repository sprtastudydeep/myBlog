const express = require('express');
const router = express.Router();
const User =require('./user');
const Post =require('./posts');
const Comment =require('./comment');

router.use('/user/',User)
router.use('/posts/',Post)
router.use('/comments/',Comment)

module.exports=router;  