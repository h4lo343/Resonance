const express = require('express');

// add our router
const accountRouter = express.Router();

// require the user controller
const accountController = require('../controllers/accountController');

// Register a new user
accountRouter.post('/updateUserInfo', accountController.updateUser);

module.exports = accountRouter;

