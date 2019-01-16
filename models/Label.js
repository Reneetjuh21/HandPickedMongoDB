const mongoose = require('mongoose')
const Employee = require('./Employee')
const Schema = mongoose.Schema

const LabelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    employees: [{
        type: Employee,
    }]
})

module.exports = mongoose.model('label', LabelSchema)