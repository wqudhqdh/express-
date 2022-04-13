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
    imgSrc: [],
    level: {
        type: Number,
        required: true
    },
    authentication: {
        type: {
            name: String,
            card: String,
            idcard: String,
        }
    },
    balance: {
        type: Number,
        default: 0,
    }

})
module.exports = mongoose.model("user", userSchema, "user");