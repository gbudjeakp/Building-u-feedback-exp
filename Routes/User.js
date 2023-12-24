const express = require("express");
const router =  express.Router();
const userController   = require('../Controllers/userController')
const rateLimiter = require("../middleware/rateLimiter");

router.get("/logout", userController.logout);
router.post("/login",  rateLimiter, userController.loginUser);
router.post("/register", rateLimiter, userController.registerUser);


module.exports = router;