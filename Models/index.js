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



//Feebackrequest = feedback
// Feedback = assignedfeedback


// Define the User and Feedback models
db.User = require('./User')(sequelize, DataTypes);
db.FeedbackRequest = require('./Feedbackrequest')(sequelize, DataTypes);
db.Feedbacks = require('./Feedbacks')(sequelize, DataTypes)

// Define associations between User and Feedback models
db.User.hasMany(db.FeedbackRequest, { foreignKey: 'userId', as: 'feedbackrequest'});
db.FeedbackRequest.belongsTo(db.User, { foreignKey: 'userId' });


db.FeedbackRequest.hasMany(db.Feedbacks, { foreignKey: 'userId', as: 'feedbacks' });
db.Feedbacks.belongsTo(db.FeedbackRequest, { foreignKey: 'userId' });





// Synchronize the database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch((err) => {
    console.error('Error synchronizing the database:', err);
  });

module.exports = db;