require("dotenv").config();
const db = require("../Models/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Users = db.User;
const Token = db.Otptoken;
const { sendOTP } = require("../utility/email/email");

const sendToken = async (req, res) => {
  const { username } = req.body;

  const userInDB = await Users.findOne({ where: { username: username } });
  const userInTokenDB = await Token.findOne({ where: { username: username } });

  const otpGenerator = () => {
    const characters = "0123456789".split("");

    // Decided to use the Fisher-Yates shuffle algorithm
    // To get a better set of randomized values for OTP
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }

    const shuffledOtpArray = characters.slice(0, 4);

    const generatedOtp = shuffledOtpArray.join("");

    return generatedOtp;
  };

  const otp = otpGenerator();

  // Need to hash the otp in the DB
  const hashedOtp = await bcrypt.hash(otp, saltRounds);

  if (!userInDB) {
    return res.status(400).json({ msg: "User Does Not Exist" });
  }
  try {
    if (!userInTokenDB) {
      const saveData = {
        username: username,
        token: hashedOtp,
      };
      Token.create(saveData);
    } else {
      // This allows users to request new token to be sent.
      await userInTokenDB.update(
        { token: otp },
        {
          where: {
            username: username,
          },
        }
      );
    }
    sendOTP(username, otp);
    res.status(200).json({ msg: `OTP was sent successfully to ${username}` });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const checkToken = async (req, res) =>{
// }

const updatePassword = async (req, res) => {
  //Check that there is a token and that the token
  // is the token associated with the email so we'll need the email and token from the FE.
  // If token is not expired and is for the entered email then send a patch to update the password.

  console.log("Update your password");
};

module.exports = {
  sendToken,
  updatePassword,
};
