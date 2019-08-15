const express = require("express");
const router = express.Router();

const upload = require("../controllers/upload");
router.get("/", upload.GET_upload);
router.post("/", upload.POST_upload);

const show = require("../controllers/show");
router.get("/show", show.GET_show);
module.exports = router;