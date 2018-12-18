const moment = require('moment')
var Artist = require('../models/Artist')
const Error = require('../models/ApiError')
const auth = require('../auth/auth')

module.exports = {
    create(req, res, next){
        // var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
        //     if (err) {
        //         const error = new Error("Niet geautoriseerd (geen valid token)", 401)
        //         res.status(401).json(error)
        //     } else {
        //         token = payload
        //     }
        // })

        const properties = req.body
        Artist.create(properties)
            .then(artist => {
                res.status(201).json({
                    "message": "Artist has been succesfully created.",
                    "code": 201,
                    "artist": artist
                })
            })
        .catch((err) => {
            next(new Error(err, 500))
        });
    },

    edit(req, res, next){
        // var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
        //     if (err) {
        //         const error = new Error("Niet geautoriseerd (geen valid token)", 401)
        //         res.status(401).json(error)
        //     } else {
        //         token = payload
        //     }
        // })

        const artistId = req.body.id
        const properties = req.body

        Artist.findByIdAndUpdate({ _id: artistId }, properties)
            .then(() => Artist.findById({ _id: artistId}))
            .then((artist) => res.status(200).json({
                "message": "Artist has been succesfully edited.",
                "code": 200,
                "artist": artist
            }))
            .catch(() => {
                next(new Error('Artist not found, wrong identifier.', 422))
            })
    },

    delete(req, res, next) {
        // var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
        //     if (err) {
        //         const error = new Error("Niet geautoriseerd (geen valid token)", 401)
        //         res.status(401).json(error)
        //     } else {
        //         token = payload
        //     }
        // })

        const artistId = req.query.id

        Artist.findOneAndDelete({ _id: artistId})
            .then(() => res.status(200).json({
                "message": "Artist has been succesfully deleted.",
                "code": 200,
                "artistId": artistId
            }))
            .catch((err) => {
                next(new Error(err, 422))
            })
    },

    get(req, res, next) {
        if (req.query.id != undefined){
            const artistId = req.query.id
            Artist.findById(artistId)
                .then((artist) => {
                    if (artist !== null){
                        res.status(200).json(artist)
                    } else {
                        next(new Error('Artist not found, wrong identifier.', 422))
                    }
                })
                .catch(() => {
                    next(new Error('Artist not found, wrong identifier.', 422))
                })
        } else {
            Artist.find({})
                .then((artists) => {
                    res.status(200).json(artists)
                })
                .catch(() => {
                    next(new Error('Artists not found, no artists have been posted yet.', 404))
                })
        }
    }
}