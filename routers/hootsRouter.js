const express = require("express");
const router = express.Router();
const {
  create,
  index,
  show,
  update,
  deleteHoot,
} = require("../controllers/hootsCtrl");
const checkOwner = require("../middlewares/checkOwner");

router.post("/", create);
router.get("/", index);
router.get("/:id", show);
router.put("/:id", checkOwner, update);
router.delete("/:id", checkOwner, deleteHoot);

module.exports = router;
