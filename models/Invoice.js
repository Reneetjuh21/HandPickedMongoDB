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

module.exports = mongoose.model('invoice', InvoiceSchema)