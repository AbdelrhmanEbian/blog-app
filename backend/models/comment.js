const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    desc: {
        type: String,
        required: true,
    },
    userEmail: {
        type:String,
    },
    post:{type:mongoose.Schema.Types.ObjectId,ref:"posts"},
    category:{
        type:String
    }

},{timestamps:true})

module.exports = mongoose.model('comments', Comment);