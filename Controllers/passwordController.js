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
        { token: hashedOtp },
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
    res.status(500).json({
      error: "Internal Server Error, something happened while sending OTP",
    });
  }
};

const checkToken = async (req, res) => {
  try {
    const { username, resetToken } = req.body;
    const userTokenData = await Token.findOne({where: { username: username }});

    if (!userTokenData) {
      res.status(400).json({ msg: "Invalid request, please request for new a OTP" });
      return;
    }
    const storedHashedToken = userTokenData.token;

    bcrypt.compare( resetToken, storedHashedToken, async (err, validToken) => {
      console.log("This is Valid Token", validToken)
        if (validToken) {
    
          const IstokenExpired = new Date(userTokenData.expiresAt) > new Date();

          if (!IstokenExpired) {
            res.status(200).json({ message: "Entered OTP is Valid." });
          } else {
            res.status(400).json({ msg: "OTP has expired, please request for new a OTP" });
          }
        } else {
          console.error(err);
          res.status(400).json({ password: "Entered OTP is Invalid, try requesting for a new one." });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
};

const updatePassword = async (req, res) => {
  //Check that there is a token and that the token
  // is the token associated with the email so we'll need the email and token from the FE.
  // If token is not expired and is for the entered email then send a patch to update the password.
  //We'll first need to decrypt the token and compare.

  console.log("Update your password");
};

module.exports = {
  sendToken,
  updatePassword,
  checkToken,
};
