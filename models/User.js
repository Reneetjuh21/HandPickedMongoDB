const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    fullname: {
        type: String,
        required: [true, 'Fullname is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    postalcode: {
        type: String,
        required: [true, 'Postalcode is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    rank: {
        type: Number,
        default: 2
    }
})

module.exports = mongoose.model('user', UserSchema)