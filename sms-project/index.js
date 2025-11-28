const express = require("express");
require("dotenv").config();
const app = express();
const twilio = require("twilio");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const accountId = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountId, authToken);

app.post("/send-sms", async (req, res) => {
  const { to, message } = req.body;
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });
    res.status(200).json({
      sid: result.sid,
      message: "SMS send",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send SMS",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.render("smspage");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
