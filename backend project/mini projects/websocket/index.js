const io = require('socket.io')(3000);
const instruments = require('@socket.io/admin-ui');

// Import custom error handler
const AppError = require('./error');

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('receive_message', (message, room) => {
        if (!room) {
            socket.broadcast.emit('send_message', message);
        } else {
            socket.to(room).emit('send_message', message);
        }
    });

    socket.on('join_room', (room) => {
        socket.join(room);
    });
});

// Middleware to check authentication before allowing the user to connect
io.use((socket, next) => {
    if (socket.handshake.auth.token) {
        next(); 
    } else {
        next(new AppError(401, 'Invalid credentials')); 
    }
});

// Enable Socket.io Admin UI (for debugging)
instruments(io, { auth: false });

const errorHandler = (error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusCode || 500,
        message: error.message || 'Internal Server Error',
    });
};

class AppError extends Error {
    constructor(status, message) {
        super(message);
        this.statusCode = status;
        this.message = message;
    }
}

module.exports = { AppError, errorHandler };
