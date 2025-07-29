const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Like = sequelize.define('likes', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  quote_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'likes',
  timestamps: false,
  freezeTableName: true
});

module.exports = Like;
