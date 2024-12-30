const { Router } = require("express");
const messages = require("../data/messages");

const newRouter = Router();

newRouter.get("/new", (req, res) => {
  res.render("new");
});

newRouter.post("/new", (req, res) => {
  const { author, message } = req.body;
  if (author && message) {
    messages.push({
      text: message,
      user: author,
      added: new Date(),
    });
    res.redirect("/");
  } else {
    res.status(400).send("Both fields are required!")
  }
});

module.exports = newRouter;
