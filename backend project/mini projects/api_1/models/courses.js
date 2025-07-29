const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');  // Import User model
const user_2 = require('./user_2')
const cart = require('./cart')


const Course = sequelize.define('Course', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },  // Foreign key to reference User
  phote: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'courses',
  timestamps: true,
});

Course.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Course, { foreignKey: 'userId' });



Course.sync({ alter: true }).then(() => console.log("Course table synced"))
  .catch(err => console.error("Error syncing Course model:", err));

module.exports = Course;
