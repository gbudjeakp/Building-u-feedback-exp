module.exports = (sequelize, DataTypes) => {
  const Feedbacks = sequelize.define("Feedbacks", {
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

  return Feedbacks
};
