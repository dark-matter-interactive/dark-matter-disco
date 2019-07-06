const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
// const sequelize = new Sequelize(process.env.DBNAME || 'postgres', process.env.USERNAME || 'root', process.env.PASSWORD || 'root', {
//   host: process.env.HOSTNAME || 'localhost',
//   dialect: 'postgres'
// });


const name = process.env.DB_NAME || 'postgres';
const username = process.env.DB_USERNAME || 'operationspark';
const password = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize(name,  username, password, {
  host: process.env.DB_HOSTNAME || 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

// sequelize.sync({
//   force: true, // Drops info in database for testing
// });



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


// define Achievments model
const Achievements = sequelize.define('Achievements', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  badgeURL: Sequelize.STRING,
  starsThreshold: Sequelize.INTEGER,
});


// define userAchievments model
const userAchievements = sequelize.define('userAchievements', {
  status: Sequelize.INTEGER
});
User.belongsToMany(Achievements, { through: userAchievements });
Achievements.belongsToMany(User, { through: userAchievements });

// // TEMPLATE QUERY TO ADD NEW ACHIEVEMENTS
Achievements.findOrCreate({
  where: {
    name: 'u got moves',
    badgeURL: '../assets/livestodance.png',
    starsThreshold: 20,
  }
});
Achievements.findOrCreate({
  where: {
    name: 'Dance Master',
    badgeURL: '../assets/discoball.png',
    starsThreshold: 100,
  }
});
Achievements.findOrCreate({
  where: {
    name: 'Super Star',
    badgeURL: '../assets/superstar.png',
    starsThreshold: 200,
  }
});


// User.sync()
// Friends.sync()
// Achievements.sync({ force: true })
// userAchievements.sync({ force: true })
sequelize.sync({
  force: false, // Drops info in database for testing
});

module.exports.User = User;
module.exports.Friends = Friends;
module.exports.Achievements = Achievements;
module.exports.userAchievements = userAchievements;