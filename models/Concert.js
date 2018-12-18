const mongoose = require('mongoose')
const Ticket = require('./Ticket')
const Schema = mongoose.Schema

const ConcertSchema = new Schema({
    artist: {
        type: Schema.Types.ObjectId, 
        ref: 'artist',
        required: true 
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    created_at: Date,
    tickets: [Ticket]
})

function autoPopulateArtists(next) {
    this.populate('artist')
    next()
}

function autoPopulateTickets(next) {
    this.populate('tickets.user')
    next()
}

ConcertSchema
    .pre('findOne', autoPopulateArtists)
    .pre('find', autoPopulateArtists)
    .pre('findById', autoPopulateArtists)
    .pre('findOne', autoPopulateTickets)
    .pre('find', autoPopulateTickets)
    .pre('findById', autoPopulateTickets)


module.exports = mongoose.model('concert', ConcertSchema)