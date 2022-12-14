// require mongoose module
const mongoose = require("mongoose")

/* -------------------------------------- MODEL -------------------------------------- */
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
      type: String,
      required: true,
      unique: true
    },

    password: {
        type: String,
        required: true,
    }
})


const User = mongoose.model("User", userSchema)

module.exports = User
