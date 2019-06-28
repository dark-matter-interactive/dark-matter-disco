const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize(process.env.DBNAME || 'postgres', process.env.USERNAME || 'root', process.env.PASSWORD || 'root', {
  host: process.env.HOSTNAME || 'localhost',
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
const User = sequelize.define('Users', {
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
  },
  starsTotal: Sequelize.INTEGER,
});


//define Friends model
const Friends = sequelize.define('Friends', {
  username: Sequelize.STRING,
  friendName: Sequelize.STRING,
  status: Sequelize.INTEGER
});

// User.sync()
// Friends.sync()
sequelize.sync({
  force: true, // Drops info in database for testing
});

module.exports.User = User;
module.exports.Friends = Friends;