const express = require("express");
const app = express();
const studentRoutes = require("./routes/students.routes");
require("dotenv").config();
const connectToDB = require("./config/database");
const { MulterError } = require("multer");

connectToDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/students", studentRoutes);

app.use((err, req, res, next) => {
  if (err instanceof MulterError) {
    return res.status(400).send(`Image Error: ${err.message}: ${err.code}`);
  } else if (error) {
    return res.status(500).send(`Something went wrong: ${err.message}`);
  }
  next();
});
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port http://localhost:${process.env.PORT}/`
  );
});
