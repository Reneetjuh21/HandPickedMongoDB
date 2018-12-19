const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LabelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    apiaccesstoken: {
        type: String
    }
})

module.exports = mongoose.model('label', LabelSchema)