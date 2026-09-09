const express = require("express");
const app = express();

const cors = require("cors");
const logger = require("morgan");

require("dotenv").config();
require("./database/database");
// controllers
const authRoutes = require("./routers/authRouter");
const isSignedin = require("./middlewares/isSignedin");
const hootsRouter = require("./routers/hootsRouter");
const commentsRouter = require("./routers/commentsRouter");

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes go here

app.use("/auth", authRoutes);

app.use(isSignedin);

app.use("/hoots", hootsRouter);
app.use("/hoots/:hootId/comments", commentsRouter);

app.get("/protected", (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message || "errooooooorrrrrrrrr" });
  }
});

app.listen(3000, () => {
  console.log("The express app is ready!");
});
