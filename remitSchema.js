var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/admin')

var Schema = mongoose.Schema
var remitSchema = new Schema({
    projectid: {
        type: String,
        required: true
    },
     projectname: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
      username: {
        type: String,
        required: true
     },
    money: {
        type: Number,
        required: true
    },
       state: {
        type: Number,
        default:0,
    },
    date: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model("remit", remitSchema, "remit");