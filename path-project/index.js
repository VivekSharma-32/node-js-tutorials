const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  //   const filePath = "/users/vivek/documents/report.pdf";

  //   console.log("Base Name:", path.basename(filePath)); // report.pdf
  //   console.log("Directory Name:", path.dirname(filePath)); // report.pdf
  //   console.log("ExtName:", path.extname(filePath)); // report.pdf
  //   const paresed = path.parse(filePath);
  //   console.log("Parsed Path:", paresed); // /users/vivek/documents/summary.pdf
  //   const fullPath = path.join(__dirname, "public", "images", "avatar.png");
  //   console.log(fullPath);
  const absolutePath = path.resolve("public", "images", "avatar.png");
  console.log(absolutePath);

  res.json("Path Module");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
