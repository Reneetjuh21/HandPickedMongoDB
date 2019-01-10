const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DomainSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name of domain is required'],
        unique: true
    }
});

module.exports = mongoose.model('domain', DomainSchema);