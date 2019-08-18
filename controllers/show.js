const postModel = require("../models/post");

const fs = require("fs");
const {promisify} = require("util");
const unlinkAsync = promisify(fs.unlink); // returns a promise

module.exports.GET_post = async(req, res, next) => {
    const posts = await postModel.find().sort({'_id': -1});
    return res.render("show", { posts: posts });
    return res.send("HELLO");
};

module.exports.DELETE_POST = async(req, res, next) => {
    const postID = req.params.id;
    const photoURL = req.params.photoURL;
    // const fsError = await unlinkAsync("./data/image_post/" + photoURL);
    const post = await postModel.deleteOne({ _id: postID });
    return res.redirect("/show");
}