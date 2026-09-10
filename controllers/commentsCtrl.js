const Hoot = require("../models/hoot");

const create = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    console.log();

    if (!hoot) {
      return res.status(404).json({ error: "Hoot not found" });
    }
    req.body.author = req.user._id;
    hoot.comments.push(req.body);
    await hoot.save();

    const newComment = hoot.comments[hoot.comments.length - 1];
    // await hoot.populate("author", "username");
    newComment._doc.author = req.user;

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    const comment = hoot.comments.id(req.params.commentId);

    comment.text = req.body.text;
    await hoot.save();

    res.status(200).json(comment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);

    hoot.comments.remove(req.params.commentId);
    await hoot.save();

    res.status(204).end();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, update, deleteComment };
