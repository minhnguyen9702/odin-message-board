const { Router } = require("express");
const db = require("../data/queries") 

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  const messages = await db.getAllMessages()
  res.render("index", { messages: messages });
});

module.exports = indexRouter;
