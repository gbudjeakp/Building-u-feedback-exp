const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendOTP = (email, otp) => {
  try {
    transporter.sendMail({
      from: process.env.NODEMAILER_FROM_ADDRESS,
      to: `${email}`,
      subject: "Building-U One-Time Password (OTP)",
      html: ` <style>
      body {
        font-family: Georgia, 'Times New Roman', Times, serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
  
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      h2 {
        color: #F9EB02;
      }
  
      p {
        text-align: center;
      }
  
      .otp-container {
        text-align: center;
      }
  
      .otp {
        font-size: 24px;
        font-weight: bold;
        color: #F9EB02;
        margin: 20px 0;
        padding: 10px;
        border-radius: 5px;
        user-select: all;
      }
  
      .footer {
        margin-top: 20px;
        text-align: center;
        color: #888888;
        font-size: 1rem;
      }
    </style>
  <body>
  <div class="container">
      <h2>One-Time Password (OTP)</h2>
      <p>Your OTP is valid for a short period (1hr). Please use it to complete your action.</p>
  
      <div class="otp-container">
        <div class="otp"> ${otp} </div>
      </div>
  
      <div class="footer">
        <p>If you didn't request this OTP, please ignore this email.</p>
        <p>Building-U-Feedback. All rights reserved.</p>
      </div>
    </div>
  
  </body>`,
    });
    console.log(`OTP was sent to  ${email}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  sendOTP,
};
