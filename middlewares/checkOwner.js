const Hoot = require("../models/hoot");

const checkOwner = async (req, res, next) => {
  const hoot = await Hoot.findById(req.params.id);
  if (!hoot || !hoot.author.equals(req.user._id)) {
    return res.status(404).json({ error: "Hoot not found" });
  }
  next();
};

module.exports = checkOwner;
