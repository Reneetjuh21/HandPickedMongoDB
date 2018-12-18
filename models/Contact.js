const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId, 
        ref: 'employee',
        required: true 
    }
})


module.exports = mongoose.model('contact', ContactSchema)