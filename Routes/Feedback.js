const express = require("express");
const router =  express.Router();
const auth = require("../middleware/auth")
const feedbackController = require('../Controllers/feedbackController')

router.post("/submitfeedback", auth, feedbackController.submitFeedBack);

router.post("/assignFeedBackToMentor/:feedbackId", feedbackController.assignFeedBackToMentor);

router.get("/getfeedbackrequest", auth, feedbackController.getAllFeedBackRequests);

router.get("/getOneFeedback", auth, feedbackController.getOneFeedback);

router.put("/addFeedBack/:feedbackId", auth, feedbackController.addFeedBack);


module.exports = router;