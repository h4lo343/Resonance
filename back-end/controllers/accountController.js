const User = require('../models/user');

// a method to update user information
async function updateUser(req, res) {
    const updates = req.body.updates;
    const result = await User.findOneAndUpdate({_id: req.user._id}, updates, {new: true});
    const {_id, email, fullName, username, posts} = result;
    res.status(201).json({_id, email, fullName, username, posts});
}

module.exports = {updateUser}
