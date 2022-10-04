//link to User model
const User = require('../models/user')
const errors = require('../errors/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {BadRequestError, NotFoundError} = require("../errors");

// User registation. Assumption: Front-end will check username, email and password are valid
async function register(req, res) {
    // get properties needed from request body
    const {username, email, fullName, password} = req.body;


    // Check if the email already exists.
    let existingEmail = await User.findOne({email});
    if (existingEmail)
        throw new BadRequestError("The email has registered to the system")

    // hash the password
    const HashedPassword = await bcrypt.hashSync(password, 10);

    // register the account
    await User.create({
        username, email, fullName, password: HashedPassword
    });

    // send successful message respond
    res.status(201).json({msg: "register successfully"});


}

// User login.
async function login(req, res) {

    const {email, password} = req.body;

    // Find the user.
    const user = await User.findOne({email});

    // If the user isn't found.
    if (!user)
        throw new NotFoundError("Incorrect email/password.");

    // If the password is incorrect.
    const match = bcrypt.compareSync(password, user.password);
    if (!match)
        throw new BadRequestError('Incorrect email/password.');

    // get information to sign jwt
    const {_id, fullName, username, posts} = user;
    const Authorization = jwt.sign({_id, email, fullName, username, posts}, process.env.TOKEN_SIGNATURE, {
        expiresIn: '1d',
    });

    res.status(200).json({
        Authorization, _id, email, fullName, username, posts
    });
}

module.exports = {
    register, login,
}
