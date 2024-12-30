const { Router } = require("express");
const messages = require("../data/messages"); 

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", { messages: messages });
});

module.exports = indexRouter;
