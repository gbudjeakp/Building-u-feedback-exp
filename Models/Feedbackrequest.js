module.exports = (sequelize, DataTypes) => {
  const Feedbackrequest = sequelize.define("Feedbackrequest", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
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
    isAssigned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // This determines whether or not the assignment is up to standard
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Feedbackrequest;
};