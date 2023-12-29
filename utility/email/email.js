const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
});

const sendOTP = (email, otp) => {
  try {
    transporter.sendMail({
      from: "building-u-app", 
      to: `${email}`,
      subject: "Here's a OTP", 
      text: "Please see attached OTP 12345", 
      html: "<b>Your OTP</b>", 
    });
    console.log(`OTP was sent to  ${email}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  sendOTP,
};
