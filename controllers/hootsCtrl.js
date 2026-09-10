const Hoot = require("../models/hoot");

const create = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    // hoot._doc.author = req.user;
    await hoot.populate("author", "username");
    res.status(201).json(hoot);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

const index = async (req, res) => {
  try {
    const hoots = await Hoot.find()
      .populate("author", "comments.author")
      .sort({ createdAt: "desc" });
    res.status(200).json(hoots);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId).populate("author");
    if (!hoot) {
      return res.status(404).json({ error: "Hoot not found" });
    }
    res.status(200).json(hoot);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedHoot = await Hoot.findByIdAndUpdate(
      req.params.hootId,
      req.body,
      {
        new: true,
      },
    ).populate("author", "username");

    res.status(200).json(updatedHoot);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteHoot = async (req, res) => {
  try {
    await Hoot.findByIdAndDelete(req.params.hootId);

    res.status(204).end();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, index, show, update, deleteHoot };
