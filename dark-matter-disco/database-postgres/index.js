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