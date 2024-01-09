require("dotenv").config();
const db = require("../../Models/index");
const bcrypt = require("bcrypt");
const Token = db.Otptoken;

const tokenValidator = async (username, resetToken) => {
  try {
    const userTokenData = await Token.findOne({ where: { username: username } });

    if (!userTokenData) {
      return { success: false, msg: "Invalid request, please request for a new OTP" };
    }

    const storedHashedToken = userTokenData.token;

    const validToken = await new Promise((resolve) => {
      bcrypt.compare(resetToken, storedHashedToken, (err, result) => {
        resolve(result);
      });
    });

    if (validToken) {
      const isTokenExpired = new Date() > userTokenData.expiresAt.getTime();

      if (!isTokenExpired) {
        return { success: true, msg: "Entered OTP is valid." };
      } else {
        return { success: false, msg: "OTP has expired, please request for a new OTP" };
      }
    } else {
      return { success: false, msg: "Entered OTP is invalid, try requesting for a new one." };
    }
  } catch (err) {
    console.error(err);
    return { success: false, msg: "An error occurred. Please try again." };
  }
};


  module.exports = {
    tokenValidator
  };
  