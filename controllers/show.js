const postModel = require("../models/post");

const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink); // returns a promise
var AWS = require("aws-sdk");

module.exports.GET_post = async (req, res, next) => {
    const posts = await postModel.find().sort({ '_id': -1 });
    return res.render("show", { posts: posts });
};

module.exports.DELETE_POST = (req, res, next) => {
    const postID = req.params.id;
    // console.log(postID);
    // const photoURL = req.params.photoURL;
    // const fsError = await unlinkAsync("./data/image_post/" + photoURL);

    const post = postModel.findByIdAndRemove({ _id: postID }, (err, result) => {
        if (err) return res.send("in post delete => " + err);
        console.log(result);

        const s3FileURL = process.env.AWS_UPLOADED_FILE_URL_LINK;
        let s3bucket = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });

        var params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: result.s3_key
        };
        console.log(params.Key);
        s3bucket.deleteObject(params, (err, data) => {
            if(err) return res.send("in s3 Bucket data delete => " + err);
            console.log(data); 
            return res.redirect("/show");
        });
    });
    // console.log(post);

}