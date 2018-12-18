const moment = require('moment')
const Concert = require('../models/Concert')
const Error = require('../models/ApiError')
const auth = require('../auth/auth')

module.exports = {
    create(req, res, next){
        var token
        var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
            if (err) {
                const error = new Error("Niet geautoriseerd (geen valid token)", 401)
                res.status(401).json(error)
            } else {
                token = payload
            }
        })
        const concertId = req.body.concertId

        Concert.findById({ _id: concertId })
            .then((concert) => {
                for (i = 0; req.body.ticketValue > i; i++){
                    concert.tickets.push({ user: token.userId})
                    concert.save()
                }
            })
            .then(() => Concert.findById({ _id: concertId}))
            .then((concert) => res.status(201).json({
                "message": "Ticket has been succesfully created.",
                "code": 201,
                "concert": concert
            }))
            .catch(() => {
                next(new Error('Concert not found, wrong identifier.', 422))
            })
    },

    delete(req, res, next) {
        var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
            if (err) {
                const error = new Error("Niet geautoriseerd (geen valid token)", 401)
                res.status(401).json(error)
            } else {
                token = payload
            }
        })

        const concertId = req.query.cId
        const ticketId = req.query.tId

        Concert.findById({ _id: concertId })
            .then((concert) => {
                concert.tickets.pull(ticketId)
                concert.save()
            })
            .then(() => Concert.findById({ _id: concertId}))
            .then((newConcert) => res.status(200).json({
                "message": "Ticket has been succesfully removed.",
                "code": 200,
                "concert": newConcert
            }))
            .catch(() => {
                next(new Error('Concert not found, wrong identifier.', 422))
            })
    }, 

    getTicketsFromUser(req,res,next) {
        var ObjectId = require('mongoose').Types.ObjectId; 
        var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
            if (err) {
                const error = new Error("Niet geautoriseerd (geen valid token)", 401)
                res.status(401).json(error)
            } else {
                token = payload
            }
        }) 

        Concert.aggregate([
            { $unwind: '$tickets'},
            { $match: { "tickets.user": new ObjectId(token.userId) } },
            { $lookup: {
                "from": "artists",
                "localField": "artist",
                "foreignField": "_id",
                "as": "artist"
            }},
            { $lookup: {
                "from": "users",
                "localField": "tickets.user",
                "foreignField": "_id",
                "as": "tickets.user"
            }},
            { $project: { 'tickets' : 1, 'artist': 1, 'date': 1} },
            ])
            .then((concerts) => {
                console.log(concerts)
                res.status(200).json(
                    concerts
                )
            })
            .catch(() => {
                next(new Error('Concert not found, wrong identifier.', 422))
            })
    }
}