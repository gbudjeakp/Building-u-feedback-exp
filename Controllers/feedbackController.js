require("dotenv").config();
const db = require("../Models/index");
const { Op } = require("sequelize");
const FeedbackRequest = db.FeedbackRequest;
const Feedbacks = db.Feedbacks;
const User = db.User;
const exerciseInfo = db.ExerciseInfo;
const jwt = require("jsonwebtoken");
const feedbackrequestValidator = require("../utility/inputValidator/feedbackrequestValidator");
const feedbackValidator = require("../utility/inputValidator/feedbackValidator");
const {
  studentNotification,
} = require("../utility/notifications/flockNotification");
const logger = require("../utility/logger/logger");
const redisClient = require("../utility/redisCaching/redisCache");
const redisFunctions = require("../utility/redisCaching/redisFunctions");

/*This controller allows the interns to request for feedback using the request
feedback forms.
 */

const submitFeedBack = async (req, res) => {
  const { authToken } = req.cookies;
  const { id } = jwt.verify(authToken, process.env.JWT_SECRET);
  const { topicOfLearningSession, codeLink } = req.body;
  const { errors, validationCheck } = feedbackrequestValidator(req.body);

  if (!validationCheck) {
    logger.error(`error validating inputs: ${JSON.stringify(errors)}`);
    return res.status(400).json(errors);
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

    // Check if the user is a mentor
    const isMentor = await User.findOne({
      where: {
        id: id,
        mentor: true,
      },
    });

    //This is used to determine if we should create an exercise infromation
    //record for a user (Only interns have those)
    if (!isMentor) {
      const add_User_To_ExerciseInfo_Table = {
        userId: id,
        internName: fullName.fName,
        topic: topicOfLearningSession,
        isSubmitted: true,
      };
      await exerciseInfo.create(add_User_To_ExerciseInfo_Table);
      await FeedbackRequest.create(feedBackRequestData);
      // studentNotification(feedBackRequestData);
    }
    await redisFunctions.cacheInvalidator([
      "FeedbackRequestForms",
      "UserFeedbackRequestForms",
      "ExerciseInfo",
    ]);
    logger.info("Outdated cache successfully invalidated");
    res.status(200).json({ data: feedBackRequestData });
    logger.info(`User submitted request successfully`, {
      log: JSON.stringify(feedBackRequestData),
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
    logger.error(`error submitting request`, { error: JSON.stringify(err) });
  }
};

/*This retrieves every single feedback (only requests that are not marked as complete requests made by the interns
 */
const getAllFeedBackRequestsForms = async (req, res) => {
  try {
    const redisResponse = await redisFunctions.cacheGetFeedbackRequestForms();
    if (redisResponse !== "No Cache Hit") {
      logger.info("Success: Feedback Request Forms Retrieved from Cache");
      return res.status(200).json({ data: redisResponse });
    } else {
      logger.info(
        "Feedback Request Forms not Found In Cache: Fetching From Database"
      );
      const feedBackrequests = await FeedbackRequest.findAll({
        where: {
          status: {
            [Op.not]: true,
          },
        },
      });
      const redisEntry = JSON.stringify(feedBackrequests);
      await redisFunctions.redisSetEX("FeedbackRequestForms", 1000, redisEntry);
      logger.info("Success: Feedback Request Forms Cached");
      return res.status(200).json({ data: feedBackrequests });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    logger.error(`Server Error`, { error: JSON.stringify(err) });
  }
};

/*This Gets all the intern feedback request forms for the intern 
that is logged in */
const getUserFeedBackRequestForms = async (req, res) => {
  try {
    const redisResponse =
      await redisFunctions.cacheGetUserFeedbackRequestForms();
    if (redisResponse !== "No Cache Hit") {
      logger.info("Success: User Feedback Request Forms Retrieved from Cache");
      return res.status(200).json({ data: redisResponse });
    } else {
      logger.info(
        "User Feedback Request Forms not Found In Cache: Fetching From Database"
      );
      const { authToken } = req.cookies;
      const { id } = jwt.verify(authToken, process.env.JWT_SECRET);
      let singleFeedBack = await FeedbackRequest.findAll({
        where: { userId: id },
      });
      const redisEntry = JSON.stringify(singleFeedBack);
      await redisFunctions.redisSetEX(
        "UserFeedbackRequestForms",
        1000,
        redisEntry
      );
      logger.info("Success: User Feedback Request Forms Cached");
      res.status(200).json({ data: singleFeedBack });
      logger.info(`Feedback Requests was Fetched Successfully`);
    }
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
    logger.error({ message: err.message });
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
      logger.error(`Feedback request not found for mentor`, {
        error: JSON.stringify(feedbackRequest),
      });
      return res.status(404).json({ error: "Feedback request not found" });
    }

    // Retrieve all feedback associated with the feedback request
    const allFeedbackOnFeedbackRequest = await Feedbacks.findAll({
      where: { feedbackrequestId },
    });

    res.json({ data: allFeedbackOnFeedbackRequest });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    logger.error(`Feedback was not fetched due to error`, {
      error: JSON.stringify(error),
    });
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
    logger.info(`Notification was sent successfully`, {
      log: JSON.stringify(data),
    });
  } catch (err) {
    res.status(500).json({ msg: err });
    logger.error(`error sending notification`, { error: JSON.stringify(err) });
  }
};

/*This controller allows users to assign feedback requests to themselves
for 
 */
const assignFeedBack = async (req, res) => {
  try {
    const { feedbackrequestId } = req.params;
    const { authToken } = req.cookies;
    const { id, username } = jwt.verify(authToken, process.env.JWT_SECRET);

    // Grab the user information based on the id for updates of the request form.
    const userDetail = await User.findOne({
      where: username,
      where: { id: id },
    });

    // Find the specific feedback request record based on feedbackrequestId
    const feedbackRecord = await FeedbackRequest.findOne({
      where: { id: feedbackrequestId },
    });

    if (!feedbackRecord) {
      logger.error(`Feedback record not found`, {
        log: JSON.stringify(feedbackRecord),
      });
      return res.status(404).json({ msg: "Feedback record not found" });
    }

    feedbackRecord.isAssigned = true;
    feedbackRecord.whoisAssigned = userDetail.fName;
    await feedbackRecord.save();
    await redisClient.cacheInvalidator(["AssignedFeedbacks"]);
    logger.info("Outdated cache successfully invalidated");
    logger.info(`Feedback assigned to mentor`, {
      log: JSON.stringify(feedbackRecord),
    });
    res.json({ msg: "Feedback assigned to mentor", data: feedbackRecord });
  } catch (err) {
    logger.error(`An error occurred while updating feedback`, {
      log: JSON.stringify(err),
    });
    res
      .status(500)
      .json({ error: "An error occurred while updating feedback" });
  }
};

/*This controller allows users to add feedbacks to the feedback requests in the queue */
const addFeedBack = async (req, res) => {
  try {
    const { feedback } = req.body;
    const { errors, validationCheck } = feedbackValidator(req.body);
    const { feedbackrequestId } = req.params;
    const { authToken } = req.cookies;
    const { id } = jwt.verify(authToken, process.env.JWT_SECRET);

    if (!validationCheck) {
      logger.error(`Bad Input:`, { log: JSON.stringify(errors) });
      return res.status(400).json(errors);
    }

    // Find the specific feedback request record based on feedbackrequestId
    const feedbackRequest = await FeedbackRequest.findOne({
      where: { id: feedbackrequestId },
    });

    let fullName = await User.findOne({
      where: { id: id },
    });

    if (!feedbackRequest) {
      logger.error(`Feeback request not found`, {
        log: JSON.stringify(feedbackRequest),
      });
      return res.status(404).json({ msg: "not found" });
    }

    // Create the feedback and associate it with the feedback request and mentor
    const feedBackData = {
      userId: id,
      mentorName: fullName.fName,
      feedback: feedback,
      feedbackRequestId: feedbackRequest.id,
    };

    const createdFeedback = await Feedbacks.create(feedBackData);

    logger.info(`Feedback added successfully`, {
      log: JSON.stringify(createdFeedback),
    });
    res.status(200).json({
      msg: "Feedback added successfully",
      data: createdFeedback,
    });
  } catch (err) {
    logger.error(`An error occurred adding feedback`, {
      log: JSON.stringify(err),
    });
    res.status(500).json({ error: "An error occurred adding feedback" });
  }
};

//////////////////////////////////////////
/* Code below here are basically controller functions 
for the Code leads or mentor endpoints 
*/
///////////////////////////////////////////////

/*This controller retrieves all the assigned Feedback Requests
of the code lead logged in.
 */
const getAssignedFeedBacks = async (req, res) => {
  try {
    const redisResponse = await redisFunctions.cacheGetAssignedFeedbacks();
    if (redisResponse !== "No Cache Hit") {
      logger.info("Success: Assigned Feedbacks Retrieved from Cache");
      return res.status(200).json({ data: redisResponse });
    } else {
      logger.info(
        "Assigned Feedbacks not Found In Cache: Fetching From Database"
      );
      const { authToken } = req.cookies;
      const { id } = jwt.verify(authToken, process.env.JWT_SECRET);

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
        logger.error(`Unauthorized user`, { log: JSON.stringify(isMentor) });
        res.status(401).json({ msg: "Unauthorized user" });
        return;
      }

      let assignedList = await FeedbackRequest.findAll({
        where: {
          whoisAssigned: fullName.fName,
          status: {
            [Op.not]: true,
          },
        },
      });
      const redisEntry = JSON.stringify(assignedList);
      await redisFunctions.redisSetEX("AssignedFeedbacks", 1000, redisEntry);
      logger.info(`List fetched successfully`, {
        log: JSON.stringify(assignedList),
      });
      logger.info("Success: Assigned Feedbacks Cached");
      return res.status(200).json({ data: assignedList });
    }
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
      logger.error(`Feedback request not found`, {
        log: JSON.stringify(feedbackRequest),
      });
      res.status(404).json({ msg: "Feedback request not found" });
      return;
    }

    logger.info(`Fetched feedback successfully`, {
      log: JSON.stringify(feedbackRequest),
    });
    res.json({ data: feedbackRequest });
  } catch (error) {
    logger.error(`error:`, {
      log: JSON.stringify(error),
      error: error.message,
    });
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
      logger.error(`Unauthorized user`, { log: isMentor });
      res.status(401).json({ msg: "Unauthorized user" });
      return;
    }

    let markAsComplete = await FeedbackRequest.findOne({
      where: { id: feedbackrequestId },
    });

    if (!markAsComplete) {
      logger.error(`FeedbackRequest not found`, { log: markAsComplete });
      return res.status(404).json({ message: "FeedbackRequest not found" });
    }

    // Extract necessary information from the FeedbackRequest record
    const { userId, topicOfLearningSession } = markAsComplete;

    // Find the associated ExerciseInfo record based on userId and topic
    const exerciseInfo = await db.ExerciseInfo.findOne({
      where: { userId, topic: topicOfLearningSession },
    });

    if (!exerciseInfo) {
      logger.error(`ExerciseInfo not found`, { log: exerciseInfo });
      return res.status(404).json({ message: "ExerciseInfo not found" });
    }
    // Update the ExerciseInfo record
    await exerciseInfo.update({ isCompleted: true });

    // Update the status attribute of the FeedbackRequest record
    await markAsComplete.update({ status: true });
    await redisClient.cacheInvalidator([
      "FeedbackRequestForms",
      "UserFeedbackRequestForms",
      "ExerciseInfo",
    ]);
    logger.info("Outdated cache successfully invalidated");
    res.status(200).json({ msg: "Exercise Marked As Complete" });
  } catch (err) {
    logger.error(`Error:`, { log: JSON.stringify(err) });
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  submitFeedBack,
  getAllFeedBackRequestsForms,
  getUserFeedBackRequestForms,
  assignFeedBack,
  addFeedBack,
  getAssignedFeedBacks,
  getMentorFeedback,
  getSelectedFeedback,
  markFeedbackRequestComplete,
  flockNotification,
};
