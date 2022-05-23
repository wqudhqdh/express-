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
    // type: {
    //     type: String,
    //     required: true
    // },
    imgSrc: [],
    description: {
        type: String,
        required: true
    },
    targetMoney: {
        type: Number,
        required: true
    },
    haveMoney: {
        type: Number,
        default: 0,
    },
      havedMoney: {
        type: Number,
        default: 0,
    },
      residueMoney: {
        type: Number,
        default: 0,
    },
        count: {
        type: Number,
        default: 0,
    },
    state: {
        type: Number,
        default:0,
    },
    userid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        default: '',
    },
        date: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model("project", projectSchema, "project");