const mongoose = require('mongoose');

const Category = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    image: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    }],
})

module.exports = mongoose.model('Categories', Category);