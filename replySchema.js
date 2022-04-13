var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/admin')

var Schema = mongoose.Schema
var replySchema = new Schema({
    projectid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
   date: {
        type: Date,
        default: Date.now
    },
    replyuserid: {
        type: String,
        required: true
    },
     content: {
        type: String,
        required: true
    },
    belongid: {
        type: String,
        required: true,
     }
})
module.exports = mongoose.model("reply", replySchema, "reply");