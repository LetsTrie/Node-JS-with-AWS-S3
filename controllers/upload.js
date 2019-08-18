const postModel = require("../models/post");
const postValidation = require("../validations/post").postValidation;

const multer = require("multer");
var AWS = require("aws-sdk");

// var storage = multer.memoryStorage();
// var upload = multer({ storage: storage });

module.exports.GET_upload = (req, res, next) => res.render("upload");
module.exports.POST_upload = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.file);
  const reqData = req.body;
  const reqFile = req.file;
  const s3FileURL = process.env.AWS_UPLOADED_FILE_URL_LINK;
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: reqFile.originalname,
    Body: reqFile.buffer,
    ContentType: reqFile.mimetype,
    ACL: "public-read"
  };

  const { error } = postValidation(reqData);
  if (error) return res.send(" <h1> ERROR OCCURED </h1> ");

  s3bucket.upload(params, function(err, data) {
    if(err) return res.send("HEY " + err);
    console.log(data);
    const newPost = new postModel({
      username: reqData.username,
      photoURL: s3FileURL + reqFile.originalname,
      s3_key: params.Key
    });
    // console.log(newPost);

    newPost.save( (err, post) => {
      if(err) return res.send("HEY " + err);
      console.log(post);
      return res.redirect("/show");
    });
  });
};