const express = require("express");
const app = express();
const port = 3000;

// Custom middleware to log request time
// app.use((req, res, next) => {
//   const d = new Date();
//   console.log(
//     `Time: ${d.getDate()} / ${d.getMonth()} / ${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
//   );
//   next();
// });

const myMiddleware = (req, res, next) => {
  const d = new Date();
  console.log(
    `Time: ${d.getDate()} / ${d.getMonth()} / ${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  );
  next();
};

app.get("/", myMiddleware, (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});

app.use((req, res) => {
  res.send("<h1>404 Page Not Found</h1>");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
