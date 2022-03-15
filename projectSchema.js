var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/admin')

var Schema = mongoose.Schema
var projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    fetchList: [],
    description: {
        type: String,
        required: true
    },
  
})
module.exports = mongoose.model("project", projectSchema, "project");