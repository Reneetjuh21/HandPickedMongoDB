const moment = require('moment')
var Contact = require('../models/Contact')
const Error = require('../models/ApiError')
const auth = require('../auth/auth')

module.exports = {
    create(req, res, next){
        const properties = req.body

        Contact.create(properties)
            .then(contact => {
                res.status(201).json({
                    "message": "Contact has been succesfully created.",
                    "code": 201,
                    "contact": contact
                })
            })
        .catch((err) => {
            next(new Error(err, 500))
        })
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

    //     const contactId = req.body.id
    //     const properties = req.body

    //     Contact.findByIdAndUpdate({ _id: contactId }, properties)
    //         .then(() => Contact.findById({ _id: contactId}))
    //         .then((contact) => res.status(200).json({
    //             "message": "Contact has been succesfully edited.",
    //             "code": 200,
    //             "contact": contact
    //         }))
    //         .catch(() => {
    //             next(new Error('Contact not found, wrong identifier.', 422))
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

    //     const contactId = req.query.id

    //     Contact.findOneAndDelete({ _id: contactId})
    //         .then(() => res.status(200).json({
    //             "message": "Contact has been succesfully deleted.",
    //             "code": 200,
    //             "contactId": contactId
    //         }))
    //         .catch(() => {
    //             next(new Error('Contact not found, wrong identifier.', 422))
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