const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel') 


// @desc   Register User
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler (async (req, res) => {
    // Destructuring the incoming body object with POST request to store values in variables
    const { name, email, password } = req.body;
    // Checking if all name, email, password are included
    if (!name || !email || !password) {
        res.status('400')
        throw new Error('Please enter all fields')
    }
    // Checking if user exists
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10) // Generates bits called salt for better and unique encryption
    const hashedPassword = await bcrypt.hash(password, salt)
    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    // Checking if the user was successfully created
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc   Authenticate user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        throw new Error('Invalid credentials')
    }
    
})

// @desc   Get user data
// @route  GET api/users/me
// @access Private
const getMe = asyncHandler (async (req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => { // This functions takes in an ID as that's what we're sending as payload
    // This will sign a new token with the given id and secret
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '40d', // Token expires in 40 days
    })
}
module.exports = { registerUser, loginUser, getMe };