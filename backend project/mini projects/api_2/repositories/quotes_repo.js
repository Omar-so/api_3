const Quotes = require('../models/quotes');

async function GetAllQuotes(page, limit) {
    return await Quotes.findAll({
        limit: limit,
        offset: (page - 1) * limit
    });
}


async function BuildQuote({ quotes: quoteText, name, image_url }) {
    return await Quotes.create({
        quotes: quoteText,
        name,
        image_url
    });
}

module.exports = {
    GetAllQuotes,
    BuildQuote
};
