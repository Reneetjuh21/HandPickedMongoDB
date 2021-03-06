const moment = require('moment');
var Invoice = require('../models/Invoice');
const ApiError = require('../models/ApiError');
const auth = require('../auth/auth');
const assert = require('assert')

module.exports = {
    create(req, res, next){
        try{
            /* validation */
            assert(req.body.date, 'date must be provided');
            assert(req.body.status, 'status must be provided');
            assert(req.body.version, 'version must be provided');

            /* making constants with the items from the request's body */
            const date = req.body.date || '';
            const status = req.body.status || '';
            const version = req.body.version || '';

            /* creating an invoice with these constants and saving it to the database */
            Invoice.create({ date: date, status: status, version: version })
                .then(invoice => {
                    console.log('-=-=-=-=-=-=-=-=-=-=- Creating invoice -=-=-=-=-=-=-=-=-=-=-');
                    return res.status(201).json(invoice).end();
                })
                .catch((error) => next(new ApiError(error.toString(), 500)));
        } catch (error) {
            next(new ApiError(error.message, 500))
        }
    },

    edit(req, res, next){

        /* validation */
        assert(req.body.date, 'date must be provided');
        assert(req.body.status, 'status must be provided');
        assert(req.body.version, 'version must be provided');

        const invoiceId = req.body.id
        const properties = req.body

        Invoice.findByIdAndUpdate({ _id: invoiceId }, properties)
            .then(() => Invoice.findById({ _id: invoiceId}))
            .then((invoice) => res.status(200).json({
                "message": "Invoice has been succesfully edited.",
                "code": 200,
                "invoice": invoice
            }))
            .catch(() => {
                next(new Error('Invoice not found, wrong identifier.', 422))
            })
    },

    delete(req, res, next) {

        const invoiceId = req.params.id

        Invoice.findOneAndDelete({ _id: invoiceId})
            .then(() => res.status(200).json({
                "message": "Invoice has been succesfully deleted.",
                "code": 200,
                "invoiceId": invoiceId
            }))
            .catch((err) => {
                next(new Error(err, 422))
            })
    },

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