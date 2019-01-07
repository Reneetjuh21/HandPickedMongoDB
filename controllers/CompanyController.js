const moment = require('moment');
var Company = require('../models/Company');
const ApiError = require('../models/ApiError');
const auth = require('../auth/auth');
const assert = require('assert')

module.exports = {
    create(req, res, next){
        try {
            /* validation */
            assert(req.body.name, 'name must be provided');

            /* making constants with the items from the request's body */
            const name = req.body.name || '';
            const contact = req.body.contact || '';

            /* creating a company with these constants */
            const newCompany = new Company({ name: name, contact: contact});

            /* saving the new company to the database */
            Company.findOne({name: name})
                .then((company) => {
                    if(company == null) {
                        newCompany.save()
                            .then (() => {
                            console.log('-=-=-=-=-=-=-=-=-=-=- Creating company ' + newCompany.name + ' -=-=-=-=-=-=-=-=-=-=-');
                            return res.status(201).json(newCompany).end()
                        })
                        .catch((error) => next(new ApiError(error.toString(), 500)));
                    } else {
                        next(new ApiError('company ' + company + ' already exists'))
                    }
                })
                .catch((error) => next (new ApiError(error.toString)))
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
        Company.find({})
            .then((companies) => {
                res.status(200).json(companies)
            })
            .catch(() => {
                next(new Error('Companies not found, no companies have been posted yet.', 404))
            })
    },

    getById(req, res, next) {
        const companyId = req.params.id
        Company.findById(companyId)
            .then((company) => {
                if (company !== null){
                    res.status(200).json(company)
                } else {
                    next(new Error('Company not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Company not found, wrong identifier.', 422))
            })
    }
}