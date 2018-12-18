const moment = require('moment')
var Concert = require('../models/Concert')
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
        Concert.create({artist: properties.artist, capacity: properties.capacity, ticketPrice: properties.ticketPrice, date: properties.date, time: ''+properties.time ,created_at: moment().toDate()})
            .then(concert => {
                res.status(201).json({
                    "message": "Concert has been succesfully created.",
                    "code": 201,
                    "concert": concert
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

        const concertId = req.body.id
        const properties = req.body

        Concert.findByIdAndUpdate({ _id: concertId }, properties)
            .then(() => Concert.findById({ _id: concertId}))
            .then((concert) => res.status(200).json({
                "message": "Concert has been succesfully edited.",
                "code": 200,
                "concert": concert
            }))
            .catch(() => {
                next(new Error('Concert not found, wrong identifier.', 422))
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

        const concertId = req.query.id

        Concert.findOneAndDelete({ _id: concertId})
            .then(() => res.status(200).json({
                "message": "Concert has been succesfully deleted.",
                "code": 200,
                "concertId": concertId
            }))
            .catch(() => {
                next(new Error('Concert not found, wrong identifier.', 422))
            })
    },

    get(req, res, next) {
        if (req.query.id != undefined){
            const concertId = req.query.id
            Concert.findById(concertId).lean()
                .then((concert) => {
                    if (concert !== null){
                        res.status(200).json(concert)
                    } else {
                        next(new Error('Concert not found, wrong identifier.', 422))
                    }
                })
                .catch(() => {
                    next(new Error('Concert not found, wrong identifier.', 422))
                })
        } else if (req.query.limit == 1){
            Concert.findOne({}, {}, { sort: { 'created_at' : -1 } })
                .then((concerts) => {
                    res.status(200).json(concerts)
                })
                .catch(() => {
                    next(new Error('Concerts not found, no concerts have been posted yet.', 404))
                })
        } else if (req.query.limit == 5){
            Concert.find({}).limit(5)
                .then((concerts) => {
                    res.status(200).json(concerts)
                })
                .catch(() => {
                    next(new Error('Concerts not found, no concerts have been posted yet.', 404))
                })
        } else {
            Concert.find({})
                .then((concerts) => {
                    res.status(200).json(concerts)
                })
                .catch(() => {
                    next(new Error('Concerts not found, no concerts have been posted yet.', 404))
                })
        }
    }
}