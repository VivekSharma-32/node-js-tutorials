import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/about", (req, res) => {
  let users = [
    { id: 1, name: "Ajay", age: 28 },
    { id: 2, name: "Arun", age: 32 },
    { id: 3, name: "Nitin", age: 25 },
  ];
  res.render("about", {
    title: "About Page",
    message: "Welcome to EJS",
    items: users,
  });
});

app.get("/form", (req, res) => {
  res.render("form", { message: null });
});

app.post("/submit", (req, res) => {
  var name = req.body.name;

  const message = `Hello, ${name}. You submitted the form successfully!`;

  res.render("form", { message: message });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
