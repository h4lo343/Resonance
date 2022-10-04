const express = require('express');

// add our router
const authRouter = express.Router();

// require the user controller
const authController = require('../controllers/authController');

// Register a new user
authRouter.post('/register', authController.register);

// Login a new user.
authRouter.post('/login', authController.login);

module.exports = authRouter

