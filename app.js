const express = require("express");
const app = express();

// const helmet = require("helmet"); // Secure Response Header
// const compression = require("compression"); // Compressing Assets
// const morgan = require("morgan"); // configuring log
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const multer = require('multer');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

dotenv.config();

// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname, "access.log"), {
//         flags: "w" // need to overwrite / append first..
//     }
// )

// app.use(helmet()); 
// app.use(compression()); 
// app.use(morgan("combined", {
//     stream: accessLogStream
// }));

app.use(express.static('frontend'));
// app.use(express.static('data'));

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'data/image_post/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// app.use(
//   multer({
//     storage: fileStorage,
//     fileFilter: fileFilter
//   }).single('image')
// );

app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.connect(
    process.env.DB_CONNECT, {
        useNewUrlParser: true
    },
    () => console.log("connected to db!")
);

app.set("view engine", "ejs");

const routes = require("./routes/all.js");
app.use("/", routes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Connected to port: ${port}`));