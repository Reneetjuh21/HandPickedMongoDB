const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvoiceSchema = new Schema({
    label: {
        type: Schema.Types.ObjectId, 
        ref: 'label' 
    },
    company: {
        type: Schema.Types.ObjectId, 
        ref: 'company' 
    },
    deal: {
        type: Schema.Types.ObjectId, 
        ref: 'deal' 
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    version: {
        type: Number,
        required: true
    }
})

function autoPopulateLabel(next) {
    this.populate('label')
    next()
}

function autoPopulateCompany(next) {
    this.populate('company')
    next()
}

function autoPopulateDeal(next) {
    this.populate('deal')
    next()
}

InvoiceSchema
    .pre('findOne', autoPopulateLabel)
    .pre('find', autoPopulateLabel)
    .pre('findById', autoPopulateLabel)
    .pre('findOne', autoPopulateCompany)
    .pre('find', autoPopulateCompany)
    .pre('findById', autoPopulateCompany)
    .pre('findOne', autoPopulateDeal)
    .pre('find', autoPopulateDeal)
    .pre('findById', autoPopulateDeal)

module.exports = mongoose.model('invoice', InvoiceSchema)