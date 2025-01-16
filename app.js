require('dotenv').config()

const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter");
const db = require("./data/queries"); // Assuming you're using db queries for fetching messages

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Middleware to fetch messages from the database and add them to the request
app.use(async (req, res, next) => {
  try {
    const messages = await db.getAllMessages(); // Fetch messages from the database
    req.messages = messages; // Add messages to the request object
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Error retrieving messages");
  }
});

// Set up routes
app.use("/", indexRouter);
app.use("/", newRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});