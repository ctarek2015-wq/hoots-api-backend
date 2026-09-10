const Hoot = require("../models/hoot");

const checkAuthor = async (req, res, next) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    const comment = hoot.comments.id(req.params.commentId);

    if (comment.author.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this comment" });
    }
    // Optionally attach the hoot and comment to the request object for later use
    req.hoot = hoot;
    req.comment = comment;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = checkAuthor;
