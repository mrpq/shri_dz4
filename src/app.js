const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("view engine", "pug");
app.set("views", `${__dirname}/templates`);

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.render("index.pug", { title: "Hello" });
});

app.listen(3000);
