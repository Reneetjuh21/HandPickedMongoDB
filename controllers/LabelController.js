const moment = require('moment')
var Label = require('../models/Label')
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
        Label.create(properties)
            .then(label => {
                res.status(201).json({
                    "message": "Label has been succesfully created.",
                    "code": 201,
                    "label": label
                })
            })
        .catch((err) => {
            next(new Error(err, 500))
        });
    },

    // edit(req, res, next){
    //     // var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
    //     //     if (err) {
    //     //         const error = new Error("Niet geautoriseerd (geen valid token)", 401)
    //     //         res.status(401).json(error)
    //     //     } else {
    //     //         token = payload
    //     //     }
    //     // })

    //     const artistId = req.body.id
    //     const properties = req.body

    //     Artist.findByIdAndUpdate({ _id: artistId }, properties)
    //         .then(() => Artist.findById({ _id: artistId}))
    //         .then((artist) => res.status(200).json({
    //             "message": "Artist has been succesfully edited.",
    //             "code": 200,
    //             "artist": artist
    //         }))
    //         .catch(() => {
    //             next(new Error('Artist not found, wrong identifier.', 422))
    //         })
    // },

    // delete(req, res, next) {
    //     // var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
    //     //     if (err) {
    //     //         const error = new Error("Niet geautoriseerd (geen valid token)", 401)
    //     //         res.status(401).json(error)
    //     //     } else {
    //     //         token = payload
    //     //     }
    //     // })

    //     const artistId = req.query.id

    //     Artist.findOneAndDelete({ _id: artistId})
    //         .then(() => res.status(200).json({
    //             "message": "Artist has been succesfully deleted.",
    //             "code": 200,
    //             "artistId": artistId
    //         }))
    //         .catch((err) => {
    //             next(new Error(err, 422))
    //         })
    // },

    get(req, res, next) {
        Label.find({})
            .then((labels) => {
                res.status(200).json(labels)
            })
            .catch(() => {
                next(new Error('Labels not found, no labels have been posted yet.', 404))
            })
    },

    getById(req, res, next) {
        const labelsId = req.params.id
        Label.findById(labelsId)
            .then((labels) => {
                if (labels !== null){
                    res.status(200).json(labels)
                } else {
                    next(new Error('Label not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Label not found, wrong identifier.', 422))
            })
    }
}