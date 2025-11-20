const express = require("express");
const app = express();
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const csrfProtection = csrf({ cookie: true });

app.get("", (req, res) => {
  res.send("<h1>Home page</h1>");
});

app.get("/myForm", csrfProtection, (req, res) => {
  res.render("myform", { csrfToken: req.csrfToken() });
});

app.post("/submit", csrfProtection, (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
