const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    name: {
        type: String,
        required: [true, 'name of company is required'],
        unique: true
    },
    contact: {
        type: Schema.Types.ObjectId, 
        ref: 'contact',
        required: true 
    }
})

module.exports = mongoose.model('company', CompanySchema)