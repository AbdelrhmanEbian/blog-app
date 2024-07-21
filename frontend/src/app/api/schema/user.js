const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
const User = mongoose.models.users || mongoose.model('users', UserSchema);
module.exports = User;  