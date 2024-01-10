module.exports = (sequelize, DataTypes) => {
    const Otptoken = sequelize.define("Otptoken", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: () => Math.floor(Math.random() * 1000000)
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('DATE_ADD(NOW(), INTERVAL 1 HOUR)'),
      },
    });
  
    return Otptoken;
  };
  