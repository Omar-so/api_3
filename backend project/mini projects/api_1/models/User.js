const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false ,unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: 'users',
  timestamps: true,
});

User.sync({ alter: true }).then(() => console.log("User table synced"))
  .catch(err => console.error("Error syncing User model:", err));

module.exports = User;
