import express from "express";
import ContactRoutes from "./routes/contact.routes.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// database connection
connectDB();

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// routes
app.use("/", ContactRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Contact app listening at http://localhost:${process.env.PORT}`);
});
