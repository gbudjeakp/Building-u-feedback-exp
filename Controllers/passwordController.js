require("dotenv").config();
const db = require("../Models/index");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS;
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const Users = db.User;
const Token = db.Ototoken;

const { sendOTP } = require("../utility/email/email");

const sendToken = async (req, res) => {
  //Check if user is in DB before sending email
  const { userName } = req.body;

  const userInDB = await Users.findOne({ where: { username: userName } });

  if(!userInDB){
   return res.status(400).json({msg: "User Does Not Exist"});
  }
  try {
    sendOTP(userName);
    res.json({msg: `OTP was sent successfully to ${userName}`});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const checkToken = async (req, res) => {
  console.log("Token check ........");
};

const updatePassword = async (req, res) => {
  console.log("Update your password");
};

module.exports = {
  sendToken,
  checkToken,
  updatePassword,
};
