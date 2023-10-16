const dbConfig = require('../config/db.config');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, '', {
  host: dbConfig.host,
  dialect: 'mysql'
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define the User and Feedback models
db.User = require('./User')(sequelize, DataTypes);
db.Feedback = require('./Feedback')(sequelize, DataTypes);
db.AssignedFeedBack = require('./AssignedFeedBack')(sequelize, DataTypes);

// Define associations between User and Feedback models
db.User.hasMany(db.Feedback, { foreignKey: 'userId', as: 'feedback' });
db.Feedback.belongsTo(db.User, { foreignKey: 'userId' });

db.User.hasMany(db.AssignedFeedBack, { foreignKey: 'userId', as: 'assignedFeedback' });
db.AssignedFeedBack.belongsTo(db.User, { foreignKey: 'userId' });


// Synchronize the database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch((err) => {
    console.error('Error synchronizing the database:', err);
  });

module.exports = db;