module.exports = (sequelize, DataTypes) => {
    const AssignedFeedback = sequelize.define("feedbacks", {
      mentorName: {
        type: DataTypes.STRING,
      },
      feedback: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    return AssignedFeedback
  };
  