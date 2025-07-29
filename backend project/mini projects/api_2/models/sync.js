const { sequelize } = require('./index');
const { User, Quotes, Like } = require('./assocation');

// Sync all models
sequelize.sync({ alter: true }) // or force: true in dev only
  .then(() => console.log('All models synced.'))
  .catch((err) => console.error('Sync failed:', err));
