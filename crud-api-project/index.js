const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const studentRoutes = require("./routes/students.routes");
const userRoutes = require("./routes/users.routes");
const auth = require("./middleware/auth");
require("dotenv").config();
const connectToDB = require("./config/database");
const { MulterError } = require("multer");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
connectToDB();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after a minute",
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
// app.use(helmet());
app.use(limiter);
app.use("/api/users", userRoutes);

app.use(auth);
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
