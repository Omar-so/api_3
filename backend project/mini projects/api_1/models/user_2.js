const sequelize = require('./index');
const { Sequelize, DataTypes } = require('sequelize');

const user_2 = sequelize.define('user_2', {
    name: { type: DataTypes.STRING, allowNull: false ,unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: true },
  }, {
    tableName: 'users_2',
    timestamps: true,
  });


  
  user_2.sync({ alter: true }).then(() => console.log("user_2 table synced"))
    .catch(err => console.error("Error syncing User model:", err));
  
  module.exports = user_2;