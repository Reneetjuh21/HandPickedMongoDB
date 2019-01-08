const moment = require('moment');
var Contact = require('../models/Contact');
var Company = require('../models/Company');
const ApiError = require('../models/ApiError');
const auth = require('../auth/auth');
const assert = require('assert');

module.exports = {
    create(req, res, next) {
        try {
            /* validation */
            assert(req.body.name, 'name must be provided');
            assert(req.body.phonenumber, 'phonenumber must be provided');
            assert(req.body.email, 'email must be provided');
            assert(req.body.occupation, 'function must be provided');
            assert(req.body.employee, 'employee must be provided');
            assert(req.body.linkedin, 'phonenumber must be provided');

            /* making constants with the items from the request's body */
            const name = req.body.name || '';
            const phonenumber = req.body.phonenumber || '';
            const email = req.body.email || '';
            const occupation = req.body.occupation || '';
            const employee = req.body.employee || '';
            const linkedin = req.body.linkedin || '';

            /* creating a contact with these constants */
            const newContact = new Contact({
                name: name,
                phonenumber: phonenumber,
                email: email,
                occupation: occupation,
                employee: employee,
                linkedin: linkedin
            });

            /* saving the new contact to the database */
            newContact.save()
                .then(() => {
                    console.log('-=-=-=-=-=-=-=-=-=-=- Creating contact -=-=-=-=-=-=-=-=-=-=-');
                    return res.status(201).json(newContact).end();
                })
                .catch((error) => next(new ApiError(error.toString(), 500)))
        } catch (error) {
            next(new ApiError(error.message, 500))
        }
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

    getByEmail(req, res, next) {
        const contactsEmail = req.params.email
        Contact.findById(contactsEmail)
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