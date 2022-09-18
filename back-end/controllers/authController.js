//link to User model
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// User registation.
async function register(req, res) {
    // Front-end will check username, email and password are valid

    try {

        // Check if the email already exists.
        let existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(409).json(
                { msg: "Email has been registered" }
            )
        }

        console.log(req.body)

        // hash the password
        const Hashedpwd = await bcrypt.hashSync(req.body.password, 10);

        // register the user.
        const user = new User(
            {
                username: req.body.username,
                email: req.body.email,
                password: Hashedpwd,
            });
        await user.save();

        // Create token.
        const token = generateToken(req);

        // Send token.
        res.status(200).json(
            { token: token }
        );
    } catch (error) {
        console.log(error);
        // handle unexpected error from promises
        res.status(500).json({ msg: error.message })
    }
}

// User login.
async function login(req, res) {
    // Find the user.
    let user = await User.findOne({ email: req.body.email });

    // If the user isn't found.
    if (!user) {
        return res.status(400).json(
            { msg: "Incorrect email/password." }
        );
    }

    // If the password is incorrect.
    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) {
        return res.status(400).json(
            { msg: "Incorrect email/password." }
        );
    }

    // If the password is correct, issue token.
    else {
        const token = generateToken(req);
        res.status(200).json(
            { token: token }
        );
    }
}

// Generate token function.
function generateToken(req) {
    const tokenData = {
        email: req.body.email
    }
    const token = jwt.sign(tokenData, process.env.TOKEN_SIGNATURE, { expiresIn: '1d' });
    return token
}

module.exports = {
    register,
    login,
}
