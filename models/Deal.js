const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DealSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    sum: {
        type: Number,
        required: true
    }, 
    company: {
        type: Schema.Types.ObjectId, 
        ref: 'company',
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    valuta: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('deal', DealSchema)