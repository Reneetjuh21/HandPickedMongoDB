const moment = require('moment');
var Label = require('../models/Label');
const ApiError = require('../models/ApiError');
const auth = require('../auth/auth');
const assert = require('assert');

module.exports = {
    create(req, res, next){
        try{
            /* validation */
            assert(req.body.name, 'name must be provided');

            /* making constants with the items from the request's body */
            const name = req.body.name || '';

            /* creating an invoice with these constants and saving it to the database */
            Label.create({ name: name })
                .then(label => {
                    console.log('-=-=-=-=-=-=-=-=-=-=- Creating invoice -=-=-=-=-=-=-=-=-=-=-');
                    return res.status(201).json(label).end();
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));

        } catch (error) {
            next(new ApiError(error.message, 500))
        }
    },

    edit(req, res, next){

        /* validation */
        assert(req.params.id, 'labelId must be provided');
        assert(req.body.name, 'name must be provided');

        const labelId = req.params.id;

        Label.findByIdAndUpdate({ _id: labelId }, properties)
            .then(() => Label.findById({ _id: labelId}))
            .then((label) => res.status(200).json({
                "message": "Label has been succesfully edited.",
                "code": 200,
                "label": label
            }))
            .catch(() => {
                next(new Error('Label not found, wrong identifier.', 422))
            })
    },

    delete(req, res, next) {

        const labelId = req.params.id

        Label.findOneAndDelete({ _id: labelId})
            .then(() => res.status(200).json({
                "message": "Label has been succesfully deleted.",
                "code": 200,
                "labelId": labelId
            }))
            .catch((err) => {
                next(new Error(err, 422))
            })
    },

    get(req, res, next) {
        Label.find({})
            .then((labels) => {
                res.status(200).json(labels)
            })
            .catch(() => {
                next(new Error('Labels not found, no labels have been posted yet.', 404))
            })
    },

    getById(req, res, next) {
        const labelsId = req.params.id
        Label.findById(labelsId)
            .then((labels) => {
                if (labels !== null){
                    res.status(200).json(labels)
                } else {
                    next(new Error('Label not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Label not found, wrong identifier.', 422))
            })
    }
}