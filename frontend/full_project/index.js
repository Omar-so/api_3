const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const helmet = require('helmet')
require('dotenv').config();



// redis setup
const connectRedis = require("./config/redis");
connectRedis().then(() => console.log("Redis connected")).catch(console.error);


// DB connection
const connectDB = require('./config/db');
connectDB();

// Import routes
const adminRoutes = require('./router/admin');
const studentRoutes = require('./router/student_router');
const attendanceRoutes = require('./router/attended_router');
const subscriptionRoutes = require('./router/subscribtion_router');
const applicationRoutes = require('./router/application_router');

// Initialize app
const app = express();

// Middleware
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  credentials: true
}));

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, 
  message: { error: "Too many requests from this IP, please try again later." }
});

app.use(limiter);

// Swagger setup
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/application', applicationRoutes);

// Default route
// app.use('*', (req, res) => res.status(404).json({ message: "Route not found" }));

// Error middleware
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status(status).json({ status, message });
});

// Start server
// const PORT = process.env.PORT_NUMBER || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
