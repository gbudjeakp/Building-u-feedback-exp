module.exports = (sequelize, DataTypes) => {
    const AssignedFeedback = sequelize.define("assignedFeedback", {
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
      feedback: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING,
      },
      isAssigned:{
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    return AssignedFeedback
  };
  