require("dotenv").config();
const db = require("../Models/index");
const FeedbackRequest = db.FeedbackRequest;
const Feedbacks = db.Feedbacks;
const User = db.User;
const jwt = require("jsonwebtoken");



//@TODO
/* 
  1) Add utility that sends some sort of notification to flock upon
   feed back request.
  2) Add utility that sends notification to intern upon added review on flock.
  3) Add controller that allows code lead to change the status of the request. 
  4) Add controller that allows code lead to edit feedbacks.
  5) Add some input validation.  
  6) Add rate limiter.
  7) Add a review participant to the list of admins. 
  */


/*This controller allows the interns to request for feedback using the request
feedback forms.
 */

const submitFeedBack = async (req, res) => {
  const { token } = req.cookies;
  const { id, username } = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const { topicOfLearningSession, codeLink } = req.body;
    const feedBackRequestData = {
      userId: id,
      studentName: username,
      topicOfLearningSession: topicOfLearningSession,
      codeLink: codeLink,
    };

    await FeedbackRequest.create(feedBackRequestData);
    res.status(200).json(JSON.stringify(feedBackRequestData));
    console.log("FeedBack Request Submitted");
  } catch (err) {
    console.error(err);
  }
};

/*This retrieves every single feedback requests made by the interns
 */
const getAllFeedBackRequestsForms = async (req, res) => {
  try {
    const feedBackrequests = await FeedbackRequest.findAll();
    res.status(200).json({ data: feedBackrequests });
  } catch (err) {
    console.error(err);
  }
};

/*This Gets all the intern feedback request forms for the intern 
that is logged in */
const getUserFeedBackRequestForms = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    let singleFeedBack = await FeedbackRequest.findAll({
      where: { userId: id },
    });
    res.status(200).json({ data: singleFeedBack });
  } catch (err) {
    console.error(err);
  }
};

/*This controller gets all the feedback by a code lead on specific 
  feedback request forms
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
 

//////////////////////////////////////////
/* Code below here are basically controller functions 
for the Code leads endpoints 
*/
///////////////////////////////////////////////


/*This controller allows the Code leads to add feedbacks to the feedback requests made 
by the interns */
const addFeedBack = async (req, res) => {
  try {
    const { feedback } = req.body;
    const { feedbackrequestId } = req.params;
    const { token } = req.cookies;
    const { id, username } = jwt.verify(token, process.env.JWT_SECRET);

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

    if (!feedbackRequest) {
      return res.status(404).json({ msg: "Feedback request not found" });
    }

    // Create the feedback and associate it with the feedback request and mentor
    const feedBackData = {
      userId: feedbackRequest.userId, // Use the userId of the intern who made the request
      mentorName: username,
      feedback: feedback,
      feedbackRequestId: feedbackRequest.id, // Associate feedback with the feedback request
    };

    const createdFeedback = await Feedbacks.create(feedBackData);

    res.status(200).json({
      msg: "Feedback added successfully",
      data: createdFeedback,
    });
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
    const { token } = req.cookies;
    const { id, username } = jwt.verify(token, process.env.JWT_SECRET);

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
    const feedbackRecord = await FeedbackRequest.findOne({
      where: { id: feedbackrequestId },
    });

    if (!feedbackRecord) {
      return res.status(404).json({ msg: "Feedback record not found" });
    }

    if (feedbackRecord.isAssigned) {
      return res.json({ msg: "Feedback is already assigned to another" });
    }

    feedbackRecord.isAssigned = true;
    feedbackRecord.whoisAssigned = username;
    await feedbackRecord.save();
    res.json({msg: "Feedback Assigned to mentor"});
  } catch (err) {
    console.error(err);
    res.status(500)
    .json({ error: "An error occurred while updating feedback" });
  }
};

/*This controller retrieves all the assigned Feedback Requests
of the code lead logged in.
 */
const getAssignedFeedBacks = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { id, username } = jwt.verify(token, process.env.JWT_SECRET);

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

    let assignedList = await FeedbackRequest.findAll({
      where: { whoisAssigned: username },
    });
    res.status(200).json({ data: assignedList });
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
  getMentorFeedback
};
