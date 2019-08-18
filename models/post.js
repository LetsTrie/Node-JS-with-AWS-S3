const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 5
    },
    photoURL: {
        type: String,
        required: true
    },
    s3_key: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("aws_practice", postSchema);