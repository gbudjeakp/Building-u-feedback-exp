// User Model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mentor: {
      type: DataTypes.BOOLEAN,
    },
    mentorId: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: true,
    },
  });

  return User;
};