const moment = require('moment')
const Deal = require('../models/Deal')
const Error = require('../models/ApiError')
const auth = require('../auth/auth')

module.exports = {
    // create(req, res, next){
    //     // var token
    //     // var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
    //     //     if (err) {
    //     //         const error = new Error("Niet geautoriseerd (geen valid token)", 401)
    //     //         res.status(401).json(error)
    //     //     } else {
    //     //         token = payload
    //     //     }
    //     // })
    //     const concertId = req.body.concertId

    //     Concert.findById({ _id: concertId })
    //         .then((concert) => {
    //             for (i = 0; req.body.ticketValue > i; i++){
    //                 concert.tickets.push({ user: token.userId})
    //                 concert.save()
    //             }
    //         })
    //         .then(() => Concert.findById({ _id: concertId}))
    //         .then((concert) => res.status(201).json({
    //             "message": "Ticket has been succesfully created.",
    //             "code": 201,
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

    //     const concertId = req.query.cId
    //     const ticketId = req.query.tId

    //     Concert.findById({ _id: concertId })
    //         .then((concert) => {
    //             concert.tickets.pull(ticketId)
    //             concert.save()
    //         })
    //         .then(() => Concert.findById({ _id: concertId}))
    //         .then((newConcert) => res.status(200).json({
    //             "message": "Ticket has been succesfully removed.",
    //             "code": 200,
    //             "concert": newConcert
    //         }))
    //         .catch(() => {
    //             next(new Error('Concert not found, wrong identifier.', 422))
    //         })
    // }, 

    get(req, res, next) {
        Deal.find({})
            .then((deals) => {
                res.status(200).json(deals)
            })
            .catch(() => {
                next(new Error('Deals not found, no deals have been posted yet.', 404))
            })
    },

    getById(req, res, next) {
        const dealsId = req.params.id
        Deal.findById(dealsId)
            .then((deals) => {
                if (deals !== null){
                    res.status(200).json(deals)
                } else {
                    next(new Error('Deal not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Deal not found, wrong identifier.', 422))
            })
    }
}