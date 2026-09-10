const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  create,
  update,
  deleteComment,
} = require("../controllers/commentsCtrl");
const checkAuthor = require("../middlewares/checkAuthor");

router.post("/", create);
router.put("/:commentId", checkAuthor, update);
router.delete("/:commentId", checkAuthor, deleteComment);

module.exports = router;
