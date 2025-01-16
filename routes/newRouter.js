const { Router } = require("express");
const db = require("../data/queries");

const newRouter = Router();

newRouter.get("/new", (req, res) => {
  res.render("new");
});

newRouter.post("/new", async (req, res) => {
  const { author, message } = req.body;
  if (author && message) {
    await db.insertMessage( message, author )
    res.redirect("/");
  } else {
    res.status(400).send("Both fields are required!")
  }
});

module.exports = newRouter;
