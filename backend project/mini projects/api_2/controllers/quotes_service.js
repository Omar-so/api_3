const quotes_repo = require('../repositories/quotes_repo');
const custom_error = require('../errors/error');

const get_all = async (req, res, next) => {
    try {
        const { page, limit } = req.query;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        if (!pageNum || !limitNum) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const data = await quotes_repo.GetAllQuotes(pageNum, limitNum);

        res.status(200).json({
            status: 200,
            Message: "You Have Get Data",
            Data: data
        });

    } catch (error) {
        next(new custom_error(500, "Wrong In GetAll Method"));
    }
};

const build = async (req, res, next) => {
    try {
        const { quoteText, name, image_url } = req.body;

        if (!quoteText || !name || !image_url) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const data = await quotes_repo.BuildQuote({ quoteText, name, image_url });

        res.status(201).json({
            status: 201,
            Message: "Build Quote Successfully",
            Data: data
        });

    } catch (error) {
        next(new custom_error(500, "Wrong In Build Method"));
    }
};

const quotes_script = async (req, res) => {
    try {

        const quotes = req.body;
  
        if (!Array.isArray(quotes)) {
          return res.status(400).json({ error: 'Expected an array of quotes' });
        }
      
        await Promise.all(
            quotes.map(q =>
              quotes_repo.BuildQuote({ quoteText: q.quote, name: q.author, image_url: q.image_url })
            )
          );
          
      
        res.status(200).json({ message: 'All quotes received' });
        
    } catch (error) {
        next( new custom_error(500 , "quotes_script dosenot work")) 
    }
   
  }

module.exports = { get_all, build ,quotes_script };
