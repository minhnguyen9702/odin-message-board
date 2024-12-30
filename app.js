const express = require("express");
const app = express();
const path = require("node:path");
const messages = require("./data/messages");
const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.messages = messages;
  next();
});

app.use("/", indexRouter);
app.use("/", newRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});