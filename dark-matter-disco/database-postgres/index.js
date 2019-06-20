const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('postgres', 'operationspark', '', {
  host: 'localhost',
  dialect: 'postgres'
});

// Option 2: Passing a connection URI
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//define User model
const User = sequelize.define('User', {
  username: Sequelize.STRING,
  starsTotal: Sequelize.INTEGER,
  status: Sequelize.INTEGER
});

//define Friends model
const Friends = sequelize.define('Friends', {
  userId: Sequelize.INTEGER,
  friendId: Sequelize.INTEGER,
  starsGiven: Sequelize.INTEGER,
  status: Sequelize.INTEGER
});

module.exports.User = User;
module.exports.Friends = Friends;