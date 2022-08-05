
const { Post } = require("../models");

module.exports = async(req, res, next) => {
    const {postId} = req.params;
    const exists = await Post.findAll({
        where:{'postId':postId},
        limit:1
    })
    if (exists.length==0) {
        res.status(400).send({
            errorMessage: "NONE_EXIST_BOARD",
        });
        return;
    }
    res.locals.exists=exists[0].dataValues
    next()
}