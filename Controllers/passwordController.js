require("dotenv").config();
const db = require("../Models/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const Users = db.User;
const { sendOTP } = require("../utility/email/email");

const sendToken = async (req, res) => {
  try {
    const email = req.body;
    sendOTP(email);
    res.json({msg: "OTP was sent successfully"});
    console.log("Token 123456 has been sent");
  } catch (err) {
    console.error(err);
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
