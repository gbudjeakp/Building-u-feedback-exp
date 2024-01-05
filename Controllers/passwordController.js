require("dotenv").config();
const db = require("../Models/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const Users = db.User;
const Token = db.Otptoken;

const { sendOTP } = require("../utility/email/email");

const sendToken = async (req, res) => {
  const { username } = req.body;

  const userInDB = await Users.findOne({ where: { username: username } });
  const userInTokenDB = await Token.findOne({ where: {username: username}})

  if(!userInDB){
   return res.status(400).json({msg: "User Does Not Exist"});
  }
  try {
    if(!userInTokenDB){
      const saveData = {
        username: username,
        token: 123455
      }

     Token.create(saveData);
    } else{
      // This allows users to request new token to be sent.
      await userInTokenDB.update({ token: 1234},  {
        where:{
          username: username
        }
       })
    }
    res.json({msg: `OTP was sent successfully to ${username}`});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePassword = async (req, res) => {
  console.log("Update your password");
};

module.exports = {
  sendToken,
  updatePassword,
};
