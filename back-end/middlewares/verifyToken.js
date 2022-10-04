require('dotenv').config()
const jwt = require('jsonwebtoken')
const {BadRequestError} = require("../errors");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer'))
        throw new BadRequestError("Invalid Token")

    const token = authHeader.split(' ')[1];

    // attach the user to the job routes
    req.user = jwt.verify(token, process.env.TOKEN_SIGNATURE);
    next();
}

module.exports = {
    verifyToken
}
