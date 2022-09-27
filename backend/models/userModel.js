const mongoose = require("mongoose");
// This model will help us register, update, delete and fetch users
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'], // Displays this message if a name is not entered
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,

    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    }

}, {
    timestamps: true, // Adds values createdAt and updatedAt to the document
})

module.exports = mongoose.model('User', userSchema);