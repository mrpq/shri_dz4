const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("dotenv");

const app = express();
// configure app
app.use(morgan("tiny"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index.pug", { title: "Hello", repos: [{ name: "repoo" }] });
});

app.listen(3000);
