// User Model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
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
  });

  return User;
};
