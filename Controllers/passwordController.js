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
    //Frankly speaking this might not have any impact on
    // an app like this but oh well --\(0-0)/-- might change in refactor
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }

    const shuffledOtpArray = characters.slice(0, 4);

    const generatedOtp = shuffledOtpArray.join("");

    return generatedOtp;
  };

  const otp = otpGenerator();

  const hashedOtp = await bcrypt.hash(otp, saltRounds);
  const expiresAt = new Date();


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
      await userInTokenDB.update(
        { token: hashedOtp, 
          expiresAt: new Date().setHours(expiresAt.getHours() + 1) },
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
    const userTokenData = await Token.findOne({
      where: { username: username },
    });


    // This is done to see if the User exists in the Token DB
    // We do not want to bother sending/checking for a token 
    // If a user does not exist
    if (!userTokenData) {
      res
        .status(400)
        .json({ msg: "Invalid request, please request for new a OTP" });
      return;
    }
    const storedHashedToken = userTokenData.token;

    bcrypt.compare(resetToken, storedHashedToken, async (err, validToken) => {
      if (validToken) {
        const IstokenExpired =  new Date() > userTokenData.expiresAt.getTime() ;
  
        // console.log("This checks if token is expired", IstokenExpired);
        // console.log("Current Time", new Date().setHours(expiresAt.getHours() - 10))
        // console.log("Expired Time in DB", userTokenData.expiresAt)
        // console.log("Converted Current Time", new Date(1704739808049).toISOString())

        if (!IstokenExpired) {
          res.status(200).json({ message: "Entered OTP is Valid." });
        } else {
          res
            .status(400)
            .json({ msg: "OTP has expired, please request for new a OTP " });
        }
      } else {
        console.error(err);
        res
          .status(400)
          .json({
            password: "Entered OTP is Invalid, try requesting for a new one.",
          });
      }
    });
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
  try {
    const { username, resetToken } = req.body;
    const userTokenData = await Token.findOne({
      where: { username: username },
    });
  } catch (err) {}

  console.log("Update your password");
};

module.exports = {
  sendToken,
  updatePassword,
  checkToken,
};
