require("dotenv").config();
const db = require("../Models/index");
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");


const saltRounds = 10;
const Users = db.User;
const mentor = ["tom@mail.com", "mentor@mail.com"];
const reviewParticipant = []
//@TODO
/* 1) Add a review participant to the list of admins. 
Note, review participants are not  
. 
*/

const registerUser = async (req, res) => {
  const { fName, userName, password } = req.body;
  const isUserExist = await Users.findOne({ where: { username: userName } });
  const isUserMentor = mentor.includes(userName);

  try {
    ////////Checking if the entered username already exists in our DB
    if (isUserExist) {
      return res
        .status(400)
        .json({ error: "The email entered already exists" });
    }

    // Hash the password
    // Ideally adding a callback in the hash is best practice
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = {
      fName: fName,
      username: userName,
      password: hashedPassword,
      mentor: isUserMentor,
    };

    await Users.create(userData);

    //// So we can login immediately after registering,////////
    /////////////////////////////////////////////////
    const user = await Users.findOne({ where: { username: userName } });
    if (user) {
      const payload = { id: user.id, username: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      res.set(
        "Set-Cookie",
        cookie.serialize("accessToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      );
      return res.status(201).json({ message: "User Added Successfully", user: user});
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try{
    const { userName, password } = req.body;
    const user = await Users.findOne({ where: { username: userName } });
  
    if (!user) {
      return res.status(400).json({ msg: "User Does Not Exist please create account" });
    }

    const hashPassword = await user.password;
  
    bcrypt.compare(password, hashPassword, (err, passwordIsCorrect) => {
      if (passwordIsCorrect) {
        const payload = { id: user.id, username: user.username };
  
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.set(
          "Set-Cookie",
          cookie.serialize("token", token, {
            httpOnly: false,
            //   secure: process.env.NODE_ENV === "production",
            // sameSite: "strict",
            maxAge: 3600,
            path: "/",
          })
        );
        res.cookie
        res
          .status(200)
          .json({ message: "User is Logged In", user: user  });
      } else {
        console.error(err);
        res.status(400).json({ password: "Password is incorrect" });
      }
    });
  } catch (err){
   console.error(err)
  }
};


const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
    path: "/",
  });
  res.status(200).json({msg: "User was Logged Out Successfully"});
};


module.exports = {
  registerUser,
  loginUser,
  logout
};
