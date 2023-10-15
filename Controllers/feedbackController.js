require("dotenv").config();
const db = require("../Models/index");
const Feedback = db.Feedback;
const User = db.User;
const jwt = require("jsonwebtoken");
const { user } = require("../config/db.config");
const AssignedFeedBack = db.AssignedFeedBack;

const submitFeedBack = async (req, res) => {
  const { token } = req.cookies;
  const { id, username } = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const { topicOfLearningSession, codeLink, feedback } = req.body;
    const feedBackData = {
      userId: id,
      studentName: username,
      topicOfLearningSession: topicOfLearningSession,
      codeLink: codeLink,
      feedback: feedback,
    };

    await Feedback.create(feedBackData);
    res.status(200).json(JSON.stringify(feedBackData));

    console.log("FeedBack Submitted");
  } catch (err) {
    console.error(err);
  }
};

const getAllFeedBackRequests = async (req, res) => {
  try {
    const feedBackrequests = await Feedback.findAll({});
    res.status(200).json({ data: feedBackrequests });
  } catch (err) {
    console.error(err);
  }
};

/*We use this to get feedback list for the individual intern/user
Todo change function name to match what it does */
const getOneFeedback = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    let singleFeedBack = await Feedback.findAll({
      where: { userId: id },
    });
    res.status(200).json({ data: singleFeedBack });
  } catch (err) {
    console.error(err);
  }
};

//////////////////////////////////////////
/* Code below here are basically controller functions 
for the mentor endpoints 
*/

//@TODO
//Add logic to stop mentor's from adding 
//Feedback to feedback request that they have not acknowledged/assign
const addFeedBack = async (req, res) => {
    try {
      const { feedback } = req.body;
      const { feedbackId } = req.params;
      const { token } = req.cookies;
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

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

      // Find the specific feedback record based on feedbackid
      const feedbackRecord = await Feedback.findOne({where: {id: feedbackId}});
      console.log(`This is feedback record  ${feedbackRecord}`)

      if (!feedbackRecord) {
        return res.status(404).json({ msg: "Feedback record not found" });
      }

      // Update the "feedback" column with the data from req.body
      feedbackRecord.feedback = feedback;
      await feedbackRecord.save();

      res.status(200).json({ msg: "Feedback updated successfully" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while updating feedback" });
    }
};


const assignFeedBackToMentor = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { token } = req.cookies;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

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

    // Find the specific feedback record based on feedbackId
    const feedbackRecord = await Feedback.findOne({
      where: { id: feedbackId },
    });

    if (!feedbackRecord) {
      return res.status(404).json({ msg: "Feedback record not found" });
    }

    if(feedbackRecord.isAssigned){
      return res.json({ msg: "Feedback is already assigned to another"})
    } 
      
    feedbackRecord.isAssigned = true;
    await feedbackRecord.save()
    
  
    const mentorFeedbackAssigner = {
      userId: id, // Set the mentor's id as the userId
      studentName: feedbackRecord.studentName,
      topicOfLearningSession: feedbackRecord.topicOfLearningSession,
      codeLink: feedbackRecord.codeLink,
      feedback: feedbackRecord.feedback,
    }

    await AssignedFeedBack.create(mentorFeedbackAssigner);
    res.json({ msg: "Feedback Assigned to mentor", data: mentorFeedbackAssigner })
    
  } catch (err) {
    console.error(err);
    res.json({msg: "Something went wrong assigning feedback"});
  }
}; 

module.exports = {
  submitFeedBack,
  getAllFeedBackRequests,
  getOneFeedback,
  assignFeedBackToMentor,
  addFeedBack,
};
