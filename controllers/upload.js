const postModel = require("../models/post");
const postValidation = require("../validations/post").postValidation;

module.exports.GET_upload = (req, res, next) => res.render("upload");
module.exports.POST_upload = async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.file);
  const data = req.body;
  const files = req.file;

  const { error } = postValidation(data);
  if (error) return res.send(" <h1> ERROR OCCURED </h1> ");

  const newPost = new postModel({
    username: data.username,
    photoURL: files.filename
  });
  const uploadedPost = await newPost.save();
  // console.log(uploadedPost);
  return res.redirect("/show");
};