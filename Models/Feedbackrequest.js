// Feedback Model
module.exports = (sequelize, DataTypes) => {
  const Feedbackrequest = sequelize.define("feedbackrequest", {
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
    isAssigned:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

  return Feedbackrequest
};
