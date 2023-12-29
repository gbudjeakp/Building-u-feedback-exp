require("dotenv").config();
const db = require("../Models/index");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS;
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const Users = db.User;
const { sendOTP } = require("../utility/email/email");

const sendToken = async (req, res) => {
  try {
    const { username } = req.body;
    sendOTP(username);
    res.json({msg: `OTP was sent successfully to ${username}`});
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
