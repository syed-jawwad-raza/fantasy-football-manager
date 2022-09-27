const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// To protect the route
const protect = asyncHandler (async (req, res, next) => {
    // We are going to get the token from HTTP headers in the authorization object
    let token
    // The auth object in header is formated like 'Bearer token'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1] // Turn the authorization object into an array so we can get the token 

        // Verify token after decoding it using our secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token (As we gave token user id as payload) and assign it to req.user
        req.user = await User.findById(decoded.id).select('-password') // To get the user document but exclude password

        next();
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token :(')
    }
})
// Must use curly braces for exporting functions
module.exports = { protect } 