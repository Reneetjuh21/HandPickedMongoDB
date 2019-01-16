const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    deals: [{
        type: Schema.Types.ObjectId, 
        ref: 'deal'
    }]
})

module.exports = EmployeeSchema