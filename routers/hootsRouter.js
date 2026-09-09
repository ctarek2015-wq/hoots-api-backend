const express = require("express");
const router = express.Router();
const { create, index, show, update } = require("../controllers/hootsCtrl");

router.post("/", create);
router.get("/", index);
router.get("/:id", show);
router.put("/:id", update);

module.exports = router;
