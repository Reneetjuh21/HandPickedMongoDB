const mongoose = require('mongoose')
const Contact = require("./Contact")
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    name: {
        type: String,
        required: [true, 'name of company is required'],
        unique: true
    },
    contacts: [{
        type: Contact,
        required: true
    }]

})

module.exports = mongoose.model('company', CompanySchema)