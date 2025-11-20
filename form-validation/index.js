const express = require("express");
const app = express();

const { body, validationResult } = require("express-validator");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// validation registration

var validationRules = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long")
    .trim()
    .isAlpha()
    .withMessage("Username must contain only letters")
    .custom((value) => {
      if (value === "admin") {
        throw new Error("Username 'admin' is not allowed");
      }
      return true;
    })
    .customSanitizer((value) => {
      return value.toLowerCase();
    }),
  body("useremail")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("userpass")
    .isLength({ min: 5, max: 20 })
    .withMessage("Password must be between 5 and 20 characters")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
    ),
  body("userage")
    .isNumeric()
    .withMessage("Age must be a number")
    .isInt({ min: 18 })
    .withMessage("Age must be atleast 18"),
  body("usercity")
    .isIn(["Delhi", "Mumbai", "Goa", "Agra"])
    .withMessage("City must be one of Delhi, Mumbai, Goa or Agra"),
];

const port = 3000;

app.get("/myForm", (req, res) => {
  res.render("form", { errors: [] });
});
app.post("/saveForm", validationRules, (req, res) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    res.send(req.body);
  }
  res.render("form", { errors: error.array() });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
