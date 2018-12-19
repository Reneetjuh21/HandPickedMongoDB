const moment = require('moment')
const Deal = require('../models/Deal')
const Employee = require('../models/Employee')
const Error = require('../models/ApiError')
const auth = require('../auth/auth')

module.exports = {
    create(req, res, next){
        // var token
        // var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
        //     if (err) {
        //         const error = new Error("Niet geautoriseerd (geen valid token)", 401)
        //         res.status(401).json(error)
        //     } else {
        //         token = payload
        //     }
        // })
        const properties = req.body

        const deal = new Deal({
            "title": properties.title,
            "deadline": properties.deadline,
            "percentage": properties.percentage,
            "sum": properties.sum,
            "company": properties.company,
            "description": properties.description,
            "valuta": properties.valuta
        })

        const employeeId = req.body.employeeId

        Employee.findById(employeeId)
            .then((employee) => {
                if (employee !== null){
                    employee.deals.push(deal)
                    deal.save(function (err, com) {
                        dealId = com._id
                        console.log(dealId)
                        employee.save()
                        Deal.findById({ _id: dealId })
                            .then((deal) => res.status(201).json({
                                "message": "Deal has been succesfully added to employee.",
                                "code": 201,
                                "deal": deal
                            }))
                    })
                } else {
                    next(new Error('Employee not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Employee not found, wrong identifier.', 422))
            })  
    },

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