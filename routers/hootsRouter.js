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
router.get("/:hootId", show);
router.put("/:hootId", checkOwner, update);
router.delete("/:hootId", checkOwner, deleteHoot);

module.exports = router;
