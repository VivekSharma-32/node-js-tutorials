const express = require("express");
const app = express();
const twilio = require("twilio");
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const accountId =
  process.env.TWILIO_ACCOUNT_SID || "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const authToken = process.env.TWILIO_AUTH_TOKEN || "your_auth_token";
const client = new twilio(accountId, authToken);
app.post("/send-sms", async (req, res) => {
  const { to, message } = req.body;
  try {
    const result = await client.messages.create({
      body: message,
      from: "+1234567890",
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
