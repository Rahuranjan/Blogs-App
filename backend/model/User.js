const mongoose = require('mongoose');
const Blog = require('./Blog.js');
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    }]
   });

module.exports = mongoose.model('User', UserSchema);