// require mongoose module
const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    sharer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
