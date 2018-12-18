const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TicketSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'user' 
    }
})

module.exports = TicketSchema