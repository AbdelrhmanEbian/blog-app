const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    }],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ]

})

module.exports = mongoose.model('users', User);