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

const sendOTP = (email) => {
  const otpGenerator = () => {
    const characters = `0123456789`;
    let generatedOtp = "";

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedOtp += characters[randomIndex];
    }

    return generatedOtp;
  };

  const otp = otpGenerator();

  try {
    transporter.sendMail({
      from: process.env.NODEMAILER_FROM_ADDRESS,
      to: `${email}`,
      subject: "Here's Your BU-FB  OTP",
      html: `<h1>Your OTP id ${otp}</h1>`,
    });
    console.log(`OTP was sent to  ${email}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  sendOTP,
};
