const express = require("express");
// const helmet = require("helmet"); // Secure Response Header
// const compression = require("compression"); // Compressing Assets
// const morgan = require("morgan"); // configuring log
const fs = require("fs");
const path = require("path");
const app = express();

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

app.set("view engine", "ejs");

const routes = require("./routes/all.js");
app.use("/", routes); 

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Connected to ${port}`));