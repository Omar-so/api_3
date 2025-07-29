const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Quotes = sequelize.define('Quotes', {
  quotes: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  image_url: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'quotes',
  timestamps: true,
  freezeTableName: true
});

module.exports = Quotes;
