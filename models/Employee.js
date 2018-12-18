const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    label: {
        type: Schema.Types.ObjectId, 
        ref: 'label' 
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gmail: {
        type: String
    },
    deals: [{
        type: Schema.Types.ObjectId, 
        ref: 'deal'
    }]
})

module.exports = mongoose.model('employee', EmployeeSchema)