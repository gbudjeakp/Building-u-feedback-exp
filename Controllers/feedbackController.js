require("dotenv").config();
const db = require("../Models/index");
const { Op } = require("sequelize");
const FeedbackRequest = db.FeedbackRequest;
const Feedbacks = db.Feedbacks;
const User = db.User;
const jwt = require("jsonwebtoken");
const feedbackrequestValidator = require("../utility/inputValidator/feedbackrequestValidator");
const feedbackValidator = require("../utility/inputValidator/feedbackValidator");
const {
  studentNotification,
  mentorNotification,
} = require("../utility/notifications/flockNotification");

/*This controller allows the interns to request for feedback using the request
feedback forms.
 */

const submitFeedBack = async (req, res) => {
  const { authToken } = req.cookies;
  const { id } = jwt.verify(authToken, process.env.JWT_SECRET);
  const { topicOfLearningSession, codeLink } = req.body;
  const { errors, validationCheck } = feedbackrequestValidator(req.body);

  if (!validationCheck) {
     res.status(400).json(errors);
     return
  }

  let fullName = await User.findOne({
    where: { id: id },
  });

  try {
    const feedBackRequestData = {
      userId: id,
      studentName: fullName.fName,
      topicOfLearningSession: topicOfLearningSession,
      codeLink: codeLink,
    };

    await FeedbackRequest.create(feedBackRequestData);
    studentNotification(feedBackRequestData);
    res.status(200).json({ data: feedBackRequestData });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: err });
  }
};

/*This retrieves every single feedback (only requests that are not marked as complete requests made by the interns
 */
const getAllFeedBackRequestsForms = async (req, res) => {
  const { authToken } = req.cookies;
  const { id, username } = jwt.verify(authToken, process.env.JWT_SECRET);
  try {
    const isMentor = await User.findOne({
      where: {
        id: id,
        mentor: true,
      },
    });
    if (isMentor) {
      const feedBackrequests = await FeedbackRequest.findAll({
        where: {
          status: {
            [Op.not]: true,
          },
        },
      });
      res.status(200).json({ data: feedBackrequests });
    }
    if (!isMentor) {
      const feedBackrequests = await FeedbackRequest.findAll({
        where: {
          studentName: username,
          status: {
            [Op.not]: true,
          },
        },
      });
      res.status(200).json({ data: feedBackrequests });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/*This Gets all the intern feedback request forms for the intern 
that is logged in */
const getUserFeedBackRequestForms = async (req, res) => {
  try {
    const { authToken } = req.cookies;
    const { id } = jwt.verify(authToken, process.env.JWT_SECRET);
    let singleFeedBack = await FeedbackRequest.findAll({
      where: { userId: id },
    });
    res.status(200).json({ data: singleFeedBack });
  } catch (err) {
    console.error(err);
  }
};

/*This controller gets all the feedback from a code lead on specific  feedback request forms for the logged in Intern
 */
const getMentorFeedback = async (req, res) => {
  try {
    const { feedbackrequestId } = req.params;

    // Find the feedback request
    const feedbackRequest = await FeedbackRequest.findOne({
      where: { id: feedbackrequestId },
    });

    if (!feedbackRequest) {
      return res.status(404).json({ error: "Feedback request not found" });
    }

    // Retrieve all feedback associated with the feedback request
    const allFeedbackOnFeedbackRequest = await Feedbacks.findAll({
      where: { feedbackrequestId },
    });

    res.json({ data: allFeedbackOnFeedbackRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/*
This controller is used to trigger the flock webhook that is
used to notify the code leads that an intern needs a code review.
*/
const flockNotification = async (req, res) => {
  const { authToken } = req.cookies;
  const { topicOfLearningSession, codeLink } = req.body;
  const { id } = jwt.verify(authToken, process.env.JWT_SECRET);

  try {
    let fullName = await User.findOne({
      where: { id: id },
    });

    const data = {
      studentName: fullName.fName,
      topicOfLearningSession: topicOfLearningSession,
      codeLink: codeLink,
    };

    studentNotification(data);
    res.status(200).json({ message: "Notification was sent successfully" });
  } catch (err) {
    console.error();
  }
};

//////////////////////////////////////////
/* Code below here are basically controller functions 
for the Code leads or mentor endpoints 
*/
///////////////////////////////////////////////

/*This controller allows the Code leads to add feedbacks to the feedback requests made 
by the interns */
const addFeedBack = async (req, res) => {
  try {
    const { feedback } = req.body;
    const { errors, validationChecker } = feedbackValidator(req.body);
    const { feedbackrequestId } = req.params;
    const { authToken } = req.cookies;
    const { id, username } = jwt.verify(authToken, process.env.JWT_SECRET);

    if (!validationChecker) {
      res.status(400).json(errors);
      return;
    }

    // Check if the user is a mentor
    const isMentor = await User.findOne({
      where: {
        id: id,
        mentor: true,
      },
    });

    if (!isMentor) {
      return res.status(401).json({ msg: "Unauthorized user" });
    }

    // Find the specific feedback request record based on feedbackrequestId
    const feedbackRequest = await FeedbackRequest.findOne({
      where: { id: feedbackrequestId },
    });

    let fullName = await User.findOne({
      where: { id: id },
    });

    if (!feedbackRequest) {
      res.status(404).json({ msg: "Feedback request not found" });
      return
    }

    // Create the feedback and associate it with the feedback request and mentor
    const feedBackData = {
      userId: feedbackRequest.userId,
      mentorName: fullName.fName,
      feedback: feedback,
      feedbackRequestId: feedbackRequest.id,
    };

    const createdFeedback = await Feedbacks.create(feedBackData);
    res.status(200).json({
      msg: "Feedback added successfully",
      data: createdFeedback,
    });
    // mentorNotification(feedBackData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred adding feedback" });
  }
};

/*This controller allows the Code leads to assign feedback requests to themselves
 */
const assignFeedBackToMentor = async (req, res) => {
  try {
    const { feedbackrequestId } = req.params;
    const { authToken } = req.cookies;
    const { id, username } = jwt.verify(authToken, process.env.JWT_SECRET);

    // Check if the user is a mentor
    const isMentor = await User.findOne({
      where: {
        id: id,
        mentor: true,
      },
    });

    if (!isMentor) {
       res.status(401).json({ msg: "Unauthorized user" });
       return
    }

    // Find the specific feedback request record based on feedbackrequestId
    const feedbackRecord = await FeedbackRequest.findOne({
      where: { id: feedbackrequestId },
    });

    let fullName = await User.findOne({
      where: { id: id },
    });

    if (!feedbackRecord) {
       res.status(404).json({ msg: "Feedback record not found" });
       return
    }

    if (feedbackRecord.isAssigned) {
       res.json({ msg: "Feedback is already assigned to another" });
       return
    }

    feedbackRecord.isAssigned = true;
    feedbackRecord.whoisAssigned = fullName.fName;
    await feedbackRecord.save();
    res.json({ msg: "Feedback Assigned to mentor" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating feedback" });
  }
};

/*This controller retrieves all the assigned Feedback Requests
of the code lead logged in.
 */
const getAssignedFeedBacks = async (req, res) => {
  try {
    const { authToken } = req.cookies;
    const { id, username } = jwt.verify(authToken, process.env.JWT_SECRET);

    let fullName = await User.findOne({
      where: { id: id },
    });

    // Check if the user is a mentor
    const isMentor = await User.findOne({
      where: {
        id: id,
        mentor: true,
      },
    });

    if (!isMentor) {
       res.status(401).json({ msg: "Unauthorized user" });
       return
    }

    let assignedList = await FeedbackRequest.findAll({
      where: {
        whoisAssigned: fullName.fName,
        status: {
          [Op.not]: true,
        },
      },
    });
    res.status(200).json({ data: assignedList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/*This controller fetches a specific request id */
const getSelectedFeedback = async (req, res) => {
  try {
    const { feedbackrequestId } = req.params;

    // Find the specific feedback request record based on feedbackrequestId
    const feedbackRequest = await FeedbackRequest.findOne({
      where: { id: feedbackrequestId },
    });

    if (!feedbackRequest) {
       res.status(404).json({ msg: "Feedback request not found" });
       return
    }

    res.json({ data: feedbackRequest });
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ msg: "Invalid authentication token" });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
};

const markFeedbackRequestComplete = async (req, res) => {
  try {
    const { feedbackrequestId } = req.params;
    const { authToken } = req.cookies;
    const { id } = jwt.verify(authToken, process.env.JWT_SECRET);

    // Check if the user is a mentor
    const isMentor = await User.findOne({
      where: {
        id: id,
        mentor: true,
      },
    });

    if (!isMentor) {
       res.status(401).json({ msg: "Unauthorized user" });
       return
    }

    let markAsComplete = await FeedbackRequest.findOne({
      where: { id: feedbackrequestId },
    });

    markAsComplete.status = true;
    await markAsComplete.save();

    res.status(200).json({ msg: "Exercise Marked As Complete" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  submitFeedBack,
  getAllFeedBackRequestsForms,
  getUserFeedBackRequestForms,
  assignFeedBackToMentor,
  addFeedBack,
  getAssignedFeedBacks,
  getMentorFeedback,
  getSelectedFeedback,
  markFeedbackRequestComplete,
  flockNotification,
};
