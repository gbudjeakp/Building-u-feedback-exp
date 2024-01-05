module.exports = (sequelize, DataTypes) => {
    const Otptoken = sequelize.define("Otptoken", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          token: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP + INTERVAL \'1 hour\''),
          },
    });
  
    return Otptoken
  };
  