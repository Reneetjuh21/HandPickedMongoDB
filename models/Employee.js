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

function autoPopulateDeal(next) {
    this.populate('deals')
    next()
}

EmployeeSchema
    .pre('findOne', autoPopulateDeal)
    .pre('find', autoPopulateDeal)
    .pre('findById', autoPopulateDeal)

module.exports = EmployeeSchema