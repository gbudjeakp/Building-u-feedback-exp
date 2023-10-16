// User Model
module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mentor: {
      type: DataTypes.BOOLEAN,
    },
  });

  return User
}