const mongoose = require('mongoose')


// Schema Design
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required and should be unique'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
}, { timestamps: true })

// exports
const userModel = mongoose.model('users', userSchema);
module.exports = userModel 