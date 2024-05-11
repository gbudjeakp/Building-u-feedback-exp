module.exports = (sequelize, DataTypes) => {
  const ExerciseInfo = sequelize.define("ExerciseInfo", {
    internName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topic: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    isSubmitted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return ExerciseInfo;
};
