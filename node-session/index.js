const express = require("express");
const app = express();

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/sessionDB",
      collectionName: "mysessions",
      //   ttl: 1 * 24 * 60 * 60, // 1 days
    }),
    cookie: { maxAge: 10000 * 60 * 60 * 24 }, // 24 hours
  })
);

app.get("/", (req, res) => {
  if (req.session.username) {
    res.send(`<h1>Username from session is: ${req.session.username}</h1>`);
  } else {
    res.send("<h1>No username found in session</h1>");
  }
});

app.get("/set-username", (req, res) => {
  req.session.username = "Vivek";
  res.send("<h1>Username has been set</h1>");
});

app.get("/get-username", (req, res) => {
  if (req.session.username) {
    res.send(`<h1>Username from session is: ${req.session.username}</h1>`);
  } else {
    res.send("<h1>No username found in session</h1>");
  }
});

app.get("/destroy", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("<h1>Failed to destroy session</h1>");
    } else {
      res.send("<h1>Session destroyed successfully</h1>");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
