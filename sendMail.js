const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration to allow requests from specific origins
const corsOptions = {
  origin: ["http://localhost:3000", "https://raigo-hoim.netlify.app"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/send", (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res
      .status(400)
      .send("Missing required fields: to, subject, message");
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending an email:", error);
      return res.status(500).send(`Error sending an email: ${error.message}`);
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).send("Email sent successfully");
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
