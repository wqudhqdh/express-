var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/admin')

var Schema = mongoose.Schema
var commentSchema = new Schema({
    projectid: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
   date: {
        type: Date,
        default: Date.now
    },
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    imgSrc: []
})
module.exports = mongoose.model("comments", commentSchema, "comments");