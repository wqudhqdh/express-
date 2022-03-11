var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/admin')

var Schema = mongoose.Schema

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    paypassword: {
        type: String,
        required: true
    },
    account: {
        type: Number,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    }

})
module.exports = mongoose.model("user", userSchema, "user");