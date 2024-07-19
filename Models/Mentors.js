module.exports = (sequelize, DataTypes) => {
    const Mentor = sequelize.define("Mentor", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      }
    });
  
    return Mentor;
  };
  