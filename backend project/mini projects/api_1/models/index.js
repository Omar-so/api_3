const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Connected to MySQL using Sequelize.'))
  .catch(err => console.error('Database connection error:', err.message));

module.exports = sequelize;
