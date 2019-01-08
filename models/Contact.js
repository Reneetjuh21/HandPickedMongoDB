const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId, 
        ref: 'employee',
        required: true 
    },
    linkedin: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('contact', ContactSchema)