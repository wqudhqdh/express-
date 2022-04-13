var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/admin')

var Schema = mongoose.Schema
var newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imgSrc: [],
    description: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
  
})
module.exports = mongoose.model("news", newsSchema, "news");