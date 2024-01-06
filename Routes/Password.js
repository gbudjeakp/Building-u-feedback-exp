const express = require("express");
const router =  express.Router();
const rateLimiter = require("../middleware/rateLimiter");
const passwordController = require('../Controllers/passwordController');



router.post("/forgotPassword", passwordController.sendToken);

router.get("/checkToken", passwordController.checkToken);

router.patch("/updatePassword", passwordController.updatePassword);



module.exports = router;