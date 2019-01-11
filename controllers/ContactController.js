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
            assert(req.body.companyId, 'companyId must be provided');

            /* making constants with the items from the request's body */
            const name = req.body.name || '';
            const phonenumber = req.body.phonenumber || '';
            const email = req.body.email || '';
            const occupation = req.body.occupation || '';
            const employee = req.body.employee || '';
            const linkedin = req.body.linkedin || '';
            const companyId = req.params.companyId || '';

            /* creating a contact with these constants */
            const newContact = new Contact({
                name: name,
                phonenumber: phonenumber,
                email: email,
                occupation: occupation,
                employee: employee,
                linkedin: linkedin
            });

            Company.findById(companyId)
                .then((company) => {
                    company.contacts.push(newContact)
                    newContact.save()
                    company.save()

                    Contact.findById({ _id: newContact._id })
                        .then((contact) => res.status(201).json({
                            "message": "Contact has been succesfully added to company.",
                            "code": 201,
                            "contact": contact
                        }))
                })
        } catch (error) {
            next(new ApiError(error.message, 500))
        }
    },

    edit(req, res, next){

        try {
            /* validation */
            assert(req.body.name, 'name must be provided');
            assert(req.body.phonenumber, 'phonenumber must be provided');
            assert(req.body.email, 'email must be provided');
            assert(req.body.occupation, 'function must be provided');
            assert(req.body.employee, 'employee must be provided');
            assert(req.body.linkedin, 'phonenumber must be provided');
        } catch (error) {
            next(new ApiError(error.message, 500))
        }

        const contactId = req.body.id
        const properties = req.body

        Contact.findByIdAndUpdate({ _id: contactId }, properties)
            .then(() => Contact.findById({ _id: contactId}))
            .then((contact) => res.status(200).json({
                "message": "Contact has been succesfully edited.",
                "code": 200,
                "contact": contact
            }))
            .catch(() => {
                next(new Error('Contact not found, wrong identifier.', 422))
            })
    },

    delete(req, res, next) {
        const contactId = req.query.id

        Contact.findOneAndDelete({ _id: contactId})
            .then(() => res.status(200).json({
                "message": "Contact has been succesfully deleted.",
                "code": 200,
                "contactId": contactId
            }))
            .catch(() => {
                next(new Error('Contact not found, wrong identifier.', 422))
            })
    },

    get(req, res, next) {
        const contactsEmail = req.query.email
        const contactsId = req.query.id

        if(contactsId !== null && contactsId !== undefined){
            Contact.findById(contactsId)
                .then((contacts) => {
                    if (contacts !== null) {
                        res.status(200).json(contacts)
                    } else {
                        next(new Error('Contact not found, wrong identifier.', 422))
                    }
                })
                .catch(() => {
                    next(new Error('Contact not found, wrong identifier.', 422))
                })
        } else if (contactsEmail !== null && contactsEmail !== undefined){
            Contact.findOne({email: contactsEmail})
                .then((contacts) => {
                    if (contacts !== null) {
                        res.status(200).json(contacts)
                    } else {
                        next(new Error('Contact not found, wrong identifier.', 422))
                    }
                })
                .catch(() => {
                    next(new Error('Contact not found, wrong identifier.', 422))
                })
        } else {
            Contact.find({})
                .then((contacts) => {
                    res.status(200).json(contacts)
                })
                .catch(() => {
                    next(new Error('Contacts not found, no contacts have been posted yet.', 404))
                })
        }
    }
}