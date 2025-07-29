const User = require('./user');
const Quotes = require('./quotes');
const Like = require('./like');

// Define many-to-many association
User.belongsToMany(Quotes, {
  through: Like,
  foreignKey: 'user_id'
});

Quotes.belongsToMany(User, {
  through: Like,
  foreignKey: 'quote_id'
});

module.exports = { User, Quotes, Like };
