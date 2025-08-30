const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const CustomError = require('../utilty/Error'); 

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,    
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create Admin
AdminSchema.statics.createAdmin = async function(adminData) {
    const Admin = this; 

    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
        throw new CustomError(400 , "Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    const admin = new Admin({
        ...adminData,
        password: hashedPassword
    });

    return admin.save();
};

// Get Admin by Email
AdminSchema.statics.getByEmail = async function(email) {
    const Admin = this;
    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new CustomError(404, "Admin not found");
    }
    return admin;
};

module.exports = mongoose.model('Admin', AdminSchema);

