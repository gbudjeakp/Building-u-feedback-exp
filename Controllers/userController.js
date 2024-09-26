require("dotenv").config();
const db = require("../Models/index");
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const Users = db.User;
const ExerciseInfo = db.ExerciseInfo;
const FeedbackRequest = db.FeedbackRequest;
const Feedbacks = db.Feedbacks;
const Mentors = require("../admin.json");
const loginValidator = require("../utility/inputValidator/loginValidator");
const registerValidator = require("../utility/inputValidator/registerValidator");
const logger = require("../utility/logger/logger");

//Allows users to register to the app
const registerUser = async (req, res) => {
  const { fName, userName, password } = req.body;
  const { errors, validationCheck } = registerValidator(req.body);
  const isUserExist = await Users.findOne({ where: { username: userName } });

  //Check if the user should be a mentor based on the email
  const isMentor = Mentors.Mentors.includes(userName);
  const { v4: uuidv4 } = require("uuid");

  // This checks that the inputs entered meet some criteria
  if (!validationCheck) {
    logger.error(`input error:`, { log: JSON.stringify(errors) });
    res.status(400).json(errors);
    return;
  }

  try {
    ////////Checking if the entered username already exists in our DB
    if (isUserExist) {
      logger.error(`The email entered already exists`, {
        log: JSON.stringify(isUserExist),
      });
      return res
        .status(400)
        .json({ error: "The email entered already exists" });
    }

    // Hash the password
    // Ideally adding a callback in the hash is best practice
    //Might add callback as code
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = {
      fName: fName,
      username: userName,
      password: hashedPassword,
      mentor: isMentor,
      mentorId: isMentor ? uuidv4() : null,
    };

    await Users.create(userData);

    //// So we can login immediately after registering,////////
    /////////////////////////////////////////////////
    const user = await Users.findOne({ where: { username: userName } });
    if (user) {
      const payload = {
        id: user.id,
        username: user.username,
        fName: user.fName,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      res.set(
        "Set-Cookie",
        cookie.serialize("authToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 3600,
          path: "/",
        })
      );
      //Using this so we don't send the actual hash to the front-end
      user.password = "******";

      logger.info(`User Added Successfully`, { log: JSON.stringify(user) });
      return res
        .status(201)
        .json({ message: "User Added Successfully", user: user });
    }
  } catch (err) {
    logger.error(`Internal server error`, { log: JSON.stringify(err) });
    return res.status(500).json({ error: "Internal server error" });
  }
};

//This allows a user to login, into our application
const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const { errors, validationCheck } = loginValidator(req.body);
    const user = await Users.findOne({ where: { username: userName } });

    if (!validationCheck) {
      res.status(400).json(errors);
    }

    if (!user) {
      logger.error(`User Does Not Exist please create account`, {
        log: JSON.stringify(user),
      });
      return res
        .status(400)
        .json({ error: "User Does Not Exist please create account" });
    }

    const hashPassword = await user.password;

    bcrypt.compare(password, hashPassword, (err, passwordIsCorrect) => {
      if (passwordIsCorrect) {
        const payload = { id: user.id, username: user.username };

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.set(
          "Set-Cookie",
          cookie.serialize("authToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 3600,
            path: "/",
          })
        );
        res.cookie;

        //Using this so we don't send the actual hash to the front-end
        // There definetly a better way to do this but can't rightnow maybe later?
        user.password = "*****";
        res.status(200).json({ message: "User is Logged In", user: user });
      } else {
        res.status(400).json({ error: "Password is incorrect" });
      }
    });
  } catch (err) {
    logger.error(`Error:`, { log: JSON.stringify(err) });
  }
};

//This logs the user out the app by removing the
//Users token
const logout = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
  res.status(200).json({ msg: "User was Logged Out Successfully" });
  return;
};

// This feeds the auth wrapper on the fron-end letting
// the app know whether or not a user is logged in.
const authorized = (req, res) => {
  return res.json({ user: res.locals.user });
};

// This lets us update a users account information everywhere
const updateAccount = async (req, res) => {
  const { authToken } = req.cookies;
  const { fName, username, oldPassword, newPassword } = req.body;
  const { id } = jwt.verify(authToken, process.env.JWT_SECRET);
  const isUserExist = await Users.findOne({ where: { id: id } });

  try {
    if (!isUserExist) {
      return res.json({ msg: "User does not exist" });
    }

    const updates = {};
    if (fName && fName !== isUserExist.fName) {
      updates.fName = fName;
    }

    if (username && username !== isUserExist.username) {
      updates.username = username;
    }

    if (oldPassword && newPassword) {
      const passwordIsCorrect = await bcrypt.compare(
        oldPassword,
        isUserExist.password
      );
      if (!passwordIsCorrect) {
        return res.status(400).json({ msg: "Old password is incorrect" });
      }
      if (oldPassword === newPassword) {
        return res
          .status(400)
          .json({ msg: "Old password cannot be same as new password" });
      }
      updates.password = await bcrypt.hash(newPassword, saltRounds);
    }

    await isUserExist.update(updates);

    // Since the full name is used in different tables and is called different names across tables, we are simply updating them below.
    //Probably should have stuck to a naming scheme
    if (fName) {
      await FeedbackRequest.update(
        { whoisAssigned: fName },
        { where: { mentorId: isUserExist.mentorId } }
      );
      await FeedbackRequest.update(
        { studentName: fName },
        { where: { id: id } }
      );
      await ExerciseInfo.update(
        { internName: fName },
        { where: { userId: id } }
      );
      await Feedbacks.update({ mentorName: fName }, { where: { userId: id } });
    }

    return res
      .status(200)
      .json({ msg: "Account details have successfully been updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getAllExerciseInfo = async (req, res) => {
  try {
    const exerciseInfos = await db.ExerciseInfo.findAll();

    res.status(200).json({ data: exerciseInfos });
  } catch (error) {
    logger.error(`Internal server error`, { log: JSON.stringify(error) });
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  authorized,
  registerUser,
  loginUser,
  logout,
  updateAccount,
  getAllExerciseInfo,
};
