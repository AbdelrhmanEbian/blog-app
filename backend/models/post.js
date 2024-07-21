const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: String,
    views: Number,
    category:String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    userEmail : String , 
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ],
    commentsNumber:{type:Number , default:0},

},{timestamps:true})

module.exports = mongoose.model('posts', Post);