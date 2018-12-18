const moment = require('moment')
var Contact = require('../models/Contact')
const Error = require('../models/ApiError')
const auth = require('../auth/auth')

module.exports = {
    // create(req, res, next){
    //     // var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
    //     //     if (err) {
    //     //         const error = new Error("Niet geautoriseerd (geen valid token)", 401)
    //     //         res.status(401).json(error)
    //     //     } else {
    //     //         token = payload
    //     //     }
    //     // })

    //     const properties = req.body
    //     Concert.create({artist: properties.artist, capacity: properties.capacity, ticketPrice: properties.ticketPrice, date: properties.date, time: ''+properties.time ,created_at: moment().toDate()})
    //         .then(concert => {
    //             res.status(201).json({
    //                 "message": "Concert has been succesfully created.",
    //                 "code": 201,
    //                 "concert": concert
    //             })
    //         })
    //     .catch((err) => {
    //         next(new Error(err, 500))
    //     });
    // },

    // edit(req, res, next){
    //     // var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
    //     //     if (err) {
    //     //         const error = new Error("Niet geautoriseerd (geen valid token)", 401)
    //     //         res.status(401).json(error)
    //     //     } else {
    //     //         token = payload
    //     //     }
    //     // })

    //     const concertId = req.body.id
    //     const properties = req.body

    //     Concert.findByIdAndUpdate({ _id: concertId }, properties)
    //         .then(() => Concert.findById({ _id: concertId}))
    //         .then((concert) => res.status(200).json({
    //             "message": "Concert has been succesfully edited.",
    //             "code": 200,
    //             "concert": concert
    //         }))
    //         .catch(() => {
    //             next(new Error('Concert not found, wrong identifier.', 422))
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

    //     const concertId = req.query.id

    //     Concert.findOneAndDelete({ _id: concertId})
    //         .then(() => res.status(200).json({
    //             "message": "Concert has been succesfully deleted.",
    //             "code": 200,
    //             "concertId": concertId
    //         }))
    //         .catch(() => {
    //             next(new Error('Concert not found, wrong identifier.', 422))
    //         })
    // },

    get(req, res, next) {
        Contact.find({})
            .then((contacts) => {
                res.status(200).json(contacts)
            })
            .catch(() => {
                next(new Error('Contacts not found, no contacts have been posted yet.', 404))
            })
    },

    getById(req, res, next) {
        const contactsId = req.params.id
        Contact.findById(contactsId)
            .then((contacts) => {
                if (contacts !== null){
                    res.status(200).json(contacts)
                } else {
                    next(new Error('Contact not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Contact not found, wrong identifier.', 422))
            })
    }
}