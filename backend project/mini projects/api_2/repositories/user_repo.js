
const User  = require('../models/assocation')
const Quotes  = require('../models/assocation')
const Like  = require('../models/assocation')

const custom_error = require('../errors/error')

async function GetById(id) {
    const foundUser = await User.findByPk(id);
    if (!foundUser) throw new custom_error("User not found", 404);
    return foundUser;
}

async function GetByEmail(email) {
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) throw new custom_error("User not found", 404);
    return foundUser;
}

async function Build_User({ name, email, password, age }) {
    return await User.create({ name, email, password, age });
}

async function Like_quotes(quote_id, user_id) {
    const quote = await Quotes.findByPk(quote_id);
    if (!quote) throw new custom_error("Quote not found", 404);
    quote.userId = user_id;
    await quote.save(); 
    return quote;
}


async function CheckIfLiked(quote_id, user_id) {
  try {
    const like = await Like.findOne({
      where: {
        quote_id,
        user_id
      }
    });

    return !!like; 
  } catch (error) {
    console.error("Error checking like:", error);
    throw error;
  }
}



module.exports = {
    GetById,
    GetByEmail,
    Build_User,
    Like_quotes
}