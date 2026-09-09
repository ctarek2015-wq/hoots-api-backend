const express = require("express");
const router = express.Router({ mergeParams: true });
const { create } = require("../controllers/commentsCtrl");

router.post("/", create);

module.exports = router;
