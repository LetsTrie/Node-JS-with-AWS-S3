const postModel = require("../models/post");

module.exports.GET_show = async(req, res, next) => {
    const posts = await postModel.find().sort({'_id': -1});
    console.log(posts);
    return res.render("show", { posts: posts });
};