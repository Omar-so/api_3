const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // For parsing form data
app.use(cors());  // CORS for cross-origin requests

// Routers
const userRouter = require('./router/user');
const user_2Router = require('./router/User_2');
const courseRouter = require('./router/courses');
const operation = require('./router/operation');

app.use('/api/Admin', userRouter);
app.use('/api/User', user_2Router);
app.use('/api/course', courseRouter);
app.use('/api/operation', operation);

// Fallback for unsupported routes
app.use('*', (req, res) => {
    console.log("This endpoint is not supported.");
    res.status(404).json({ message: 'Endpoint not supported' });
});

// Set the port number
const port = process.env.PORT_NUMBER || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
