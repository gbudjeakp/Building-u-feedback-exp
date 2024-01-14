const axios = require("axios");

const sendNotificationToFlockWebhook = async (data) => {
  try {
    const webhookUrl = process.env.FLOCK_API;
    await axios.post(webhookUrl, data);
    console.log("Notification sent to webhook successfully.");
  } catch (error) {
    console.error("Error sending notification to webhook:", error);
  }
};

const studentNotification = (data) => {
  const message = {
    text: `${data.studentName} is requesting some review/feed back for the exercise ${data.topicOfLearningSession}. Please click link ${data.codeLink} to see code`,
  };

  // sendNotificationToFlockWebhook(message);
};

const mentorNotification = (data) => {
  const message = {
    text: `text: Code lead ${data.studentName} has added feedback on your
    ${data.topicOfLearningSession} exercise.`
  };

  // sendNotificationToFlockWebhook(message);
};

module.exports = {
  studentNotification,
  mentorNotification,
};
