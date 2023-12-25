const express = require("express");
const router =  express.Router();
const auth = require("../middleware/auth")
const rateLimiter = require("../middleware/rateLimiter");
const feedbackController = require('../Controllers/feedbackController')

router.post("/submitfeedback", auth, rateLimiter, feedbackController.submitFeedBack);

router.post("/assignFeedBackToMentor/:feedbackrequestId", auth, rateLimiter,feedbackController.assignFeedBackToMentor);

router.post("/addFeedBack/:feedbackrequestId", auth, rateLimiter, feedbackController.addFeedBack);

router.post("/notification/", auth, rateLimiter, feedbackController.flockNotification)

router.get("/getfeedbackrequestForms", auth, feedbackController.getAllFeedBackRequestsForms);

router.get("/getUserFeedBackRequestForms", auth, feedbackController.getUserFeedBackRequestForms);

router.get("/getAssignedFeedBacks", auth, feedbackController.getAssignedFeedBacks);

router.get("/getMentorFeedback/:feedbackrequestId", auth,  feedbackController.getMentorFeedback);

router.get("/getfeedbackid/:feedbackrequestId", auth, feedbackController.getSelectedFeedback)

router.get("/markFeedBackRequestComplete/:feedbackrequestId", auth,  feedbackController.markFeedbackRequestComplete);



module.exports = router;