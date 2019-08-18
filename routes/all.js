const express = require("express");
const router = express.Router();

const multer = require("multer");
var storage = multer.memoryStorage();
var uploadx = multer({ storage: storage });


const upload = require("../controllers/upload");
router.get("/", upload.GET_upload);
router.post("/", uploadx.single("image"), upload.POST_upload);

const show = require("../controllers/show");
router.get("/show", show.GET_post);
router.get("/show/delete/:id/:photoURL", show.DELETE_POST);

module.exports = router;