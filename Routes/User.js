const express = require("express");
const router =  express.Router();
const userController   = require('../Controllers/userController')
const rateLimiter = require("../middleware/rateLimiter");
const auth = require("../middleware/auth")


router.get("/authorized", auth, userController.authorized);
router.get("/logout", userController.logout);
router.post("/login",  rateLimiter, userController.loginUser);
router.post("/register", rateLimiter, userController.registerUser);
router.patch("/updateaccount", auth,  userController.updateAccount);
router.get("/exerciseInfo", auth, userController.getAllExerciseInfo);


module.exports = router;