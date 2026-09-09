const Hoot = require("../models/hoot");

const create = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    // hoot._doc.author = req.user;
    await hoot.populate("author", "username");
    res.status(201).json(hoot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create };
