module.exports = (sequelize, DataTypes) => {
  const Feedbacks = sequelize.define("Feedbacks", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
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

  return Feedbacks;
};
