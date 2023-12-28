const express = require("express");
const router =  express.Router();
const rateLimiter = require("../middleware/rateLimiter");
const passwordController = require('../Controllers/passwordController');


router.get("/forgotPassword", passwordController.sendToken);


router.get("/checkToken", passwordController.checkToken);


router.post("/updatePassword", passwordController.updatePassword);

module.exports = router;