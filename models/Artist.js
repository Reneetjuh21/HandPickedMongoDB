const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name of artist is required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'description of artist is required']
    },
    genre: {
        type: String,
        required: [true, 'genre of artist is required']
    },
    img: {
        type: String,
        required: [true, 'image of artist is required']
    }
})

ArtistSchema
    .pre('findOneAndDelete', function(next){
        const Concert = mongoose.model('concert')
        Concert.deleteMany({ artist: this._conditions._id })
        .then( () => next() )
    })

module.exports = mongoose.model('artist', ArtistSchema)