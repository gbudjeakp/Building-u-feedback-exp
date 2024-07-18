module.exports = (sequelize, DataTypes) => {
  const Otptoken = sequelize.define("Otptoken", {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4, 
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
