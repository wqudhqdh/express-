var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/admin')

var Schema = mongoose.Schema
var donateSchema = new Schema({
    projectid: {
        type: String,
        required: true
    },
    donateuserid: {
        type: String,
        required: true
    },
       donateusername: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model("donate", donateSchema, "donate");