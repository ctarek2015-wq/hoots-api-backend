const express = require("express");
const router = express.Router();
const { create } = require("../controllers/hootsCtrl");

router.post("/", create);

module.exports = router;
