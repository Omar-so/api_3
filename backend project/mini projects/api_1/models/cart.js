const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index');

const Cart = sequelize.define('Cart', {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users_2',  // Use table name string to avoid circular dependency
      key: 'id'
    },
    primaryKey: true  // Set as part of composite primary key
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'courses',  // Use table name string
      key: 'id'
    },
    primaryKey: true  // Set as part of composite primary key
  }
}, {
  tableName: 'carts',
  timestamps: true,
});

Cart.sync({ alter: true }).then(() => console.log("Cart table synced"))
  .catch(err => console.error("Error syncing Cart model:", err));

module.exports = Cart;
