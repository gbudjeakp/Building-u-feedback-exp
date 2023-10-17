// Feedback Model
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define("feedbackrequest", {
    studentName: {
      type: DataTypes.STRING,
    },
    topicOfLearningSession: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codeLink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    whoisAssigned: {
      type: DataTypes.TEXT,
    },
    // This determins whether or not the assignment is up to standard
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Feedback
};
