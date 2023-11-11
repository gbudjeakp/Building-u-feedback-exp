const express = require("express");
const router =  express.Router();
const auth = require("../middleware/auth")
const feedbackController = require('../Controllers/feedbackController')

router.post("/submitfeedback", auth, feedbackController.submitFeedBack);

router.post("/assignFeedBackToMentor/:feedbackrequestId", auth, feedbackController.assignFeedBackToMentor);

router.post("/addFeedBack/:feedbackrequestId", auth, feedbackController.addFeedBack);

router.get("/getfeedbackrequestForms", auth, feedbackController.getAllFeedBackRequestsForms);

router.get("/getUserFeedBackRequestForms", auth, feedbackController.getUserFeedBackRequestForms);

router.get("/getAssignedFeedBacks",  feedbackController.getAssignedFeedBacks);

router.get("/getMentorFeedback/:feedbackrequestId", auth,  feedbackController.getMentorFeedback);



module.exports = router;