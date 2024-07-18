module.exports = (sequelize, DataTypes) => {
    const Mentor = sequelize.define("Mentor", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
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
  