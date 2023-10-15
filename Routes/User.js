const express = require("express");
const router =  express.Router();
const userController   = require('../Controllers/userController')

router.get("/logout", userController.logout);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);


module.exports = router;