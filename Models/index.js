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
db.FeedbackRequest = require('./Feedbackrequest')(sequelize, DataTypes);
db.Feedbacks = require('./Feedbacks')(sequelize, DataTypes);
db.Otptoken = require('./Otptoken')(sequelize, DataTypes);

// Define associations between FeedbackRequests and Feedbacks model
db.User.hasMany(db.FeedbackRequest, { foreignKey: 'userId'});
db.FeedbackRequest.belongsTo(db.User, { foreignKey: 'userId' });


db.FeedbackRequest.hasMany(db.Feedbacks, { foreignKey: 'feedbackRequestId'});
db.Feedbacks.belongsTo(db.FeedbackRequest, { foreignKey: 'feedbackRequestId'});





// Synchronize the database
  (async () => {
    try {
      await sequelize.sync({alter: false}); 
      console.log('Database synchronized.');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  })();

  
module.exports = db;