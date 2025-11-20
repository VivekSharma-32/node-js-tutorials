const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("mykey123"));

app.get("/", (req, res) => {
  const username = req.signedCookies.username;
  if (!username) {
    res.send("No cookie found");
  }
  res.send(`Home Page: Cookie found: ${username}`);
});
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "Vivek Sharma", {
    maxAge: 900000,
    httpOnly: true,
    signed: true,
  });
  res.send("Cookie has been Set");
});

app.get("/get-cookie", (req, res) => {
  const username = req.signedCookies.username;
  if (!username) {
    res.send("No cookie found");
  }
  res.send(`Cookie found: ${username}`);
});

app.get("/delete-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie has been deleted");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
