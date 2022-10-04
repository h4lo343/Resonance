// require mongoose module
const mongoose = require("mongoose")

/* -------------------------------------- MODEL -------------------------------------- */
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    posts: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    }]
});

const User = mongoose.model("User", userSchema)

module.exports = User
