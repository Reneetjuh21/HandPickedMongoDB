const mongoose = require('mongoose')
const Contact = require("./Contact")
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    name: {
        type: String,
        required: [true, 'name of company is required'],
        unique: true
    },
    domains: [{
        type: String,
        unique: true
    }],
    contacts: [{
        type: Schema.Types.ObjectId,
        ref: 'contact'
    }]

})
function autoPopulateContacts(next) {
    this.populate('contacts')
    next()
}

CompanySchema
    .pre('findOne', autoPopulateContacts)
    .pre('find', autoPopulateContacts)
    .pre('findById', autoPopulateContacts)



module.exports = mongoose.model('company', CompanySchema)