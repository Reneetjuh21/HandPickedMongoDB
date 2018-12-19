const moment = require('moment')
var Invoice = require('../models/Invoice')
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
        Invoice.create(properties)
            .then(invoice => {
                res.status(201).json({
                    "message": "Invoice has been succesfully created.",
                    "code": 201,
                    "invoice": invoice
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

    //     const invoiceId = req.body.id
    //     const properties = req.body

    //     Invoice.findByIdAndUpdate({ _id: invoiceId }, properties)
    //         .then(() => Invoice.findById({ _id: invoiceId}))
    //         .then((invoice) => res.status(200).json({
    //             "message": "Invoice has been succesfully edited.",
    //             "code": 200,
    //             "invoice": invoice
    //         }))
    //         .catch(() => {
    //             next(new Error('Invoice not found, wrong identifier.', 422))
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

    //     const invoiceId = req.query.id

    //     Invoice.findOneAndDelete({ _id: invoiceId})
    //         .then(() => res.status(200).json({
    //             "message": "Invoice has been succesfully deleted.",
    //             "code": 200,
    //             "invoiceId": invoiceId
    //         }))
    //         .catch((err) => {
    //             next(new Error(err, 422))
    //         })
    // },

    get(req, res, next) {
        Invoice.find({})
            .then((invoices) => {
                res.status(200).json(invoices)
            })
            .catch(() => {
                next(new Error('Invoices not found, no invoices have been posted yet.', 404))
            })
    },

    getById(req, res, next) {
        const invoicesId = req.params.id
        Invoice.findById(invoicesId)
            .then((invoices) => {
                if (invoices !== null){
                    res.status(200).json(invoices)
                } else {
                    next(new Error('Invoice not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Invoice not found, wrong identifier.', 422))
            })
    }
}