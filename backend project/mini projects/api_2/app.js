const express = require('express');
const app = express();
const dot = require('dotenv');
dot.config();
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const HandleError = require('./errors/error');
const helmet = require('helmet');
require('./models/sync')
require('./models/assocation')

// Load the cron job
require('./utils/cron_scheduler');

// database 
require('./models/index')
// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
});
app.use(limiter);

// Routers
const user = require('./routes/user_router');
const quotes = require('./routes/quotes_router');

app.use('/api/auth', user);
app.use('/api/quotes', quotes);

app.use( (req, res) => {
    console.log("This endpoint is not supported.");
    res.status(404).json({ message: 'Endpoint not supported' });
});

// Error Middleware
app.use((err, req, res, next) => {
    if (err instanceof HandleError) {
        res.status(err.Status).json({ error: err.Message });
    } else {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



const port = process.env.PORT_NUMBER || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
