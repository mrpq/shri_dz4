const express = require("express");
const morgan = require("morgan");
require("dotenv");

const app = express();
// configure app
app.use(morgan("tiny"));
app.set("view engine", "pug");
app.set("views", `${__dirname}/templates`);

app.get("/", (req, res) => {
  res.render("index.pug", { title: "Hello", repos: [{ name: "repoo" }] });
});

app.listen(3000);
