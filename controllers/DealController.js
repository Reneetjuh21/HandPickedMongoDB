const moment = require('moment');
const Label = require('../models/Label');
const Deal = require('../models/Deal');
const ApiError = require('../models/ApiError');
const auth = require('../auth/auth');
const assert = require('assert');

module.exports = {
    create(req, res, next){
        try {
            /* validation */
            assert(req.body.title, 'title must be provided');
            assert(req.body.deadline, 'deadline must be provided');
            assert(req.body.percentage, 'percentage must be provided');
            assert(req.body.sum, 'sum must be provided');
            assert(req.body.company, 'company must be provided');
            assert(req.body.description, 'description must be provided');
            assert(req.body.valuta, 'valuta must be provided');

            /* making constants with the items from the request's body */
            const title = req.body.title || '';
            const deadline = req.body.deadline || '';
            const percentage = req.body.percentage || '';
            const sum = req.body.sum || '';
            const company = req.body.company || '';
            const description = req.body.description || '';
            const valuta = req.body.valuta || '';

            /* creating a deal with these constants */
            const newDeal = new Deal({
                title: title,
                deadline: deadline,
                percentage: percentage,
                sum: sum,
                company: company,
                description: description,
                valuta: valuta
            });

            /* further validation and preparation */
            assert(req.body.employeeId, 'employeeId must be provided');
            const employeeId = req.body.employeeId;

            try {
                Label.find({}, function (err, labels) {
                    labels.forEach(function (label) {
                        label.employees.forEach(function (employee) {
                            if (employee.id == employeeId) {
                                employee.deals.push(newDeal)
                                newDeal.save()
                                    .then(() => {
                                        console.log('-=-=-=-=-=-=-=-=-=-=-=- Saving deal -=-=-=-=-=-=-=-=-=-=-=-');
                                        const dealId = newDeal._id;
                                        console.log(dealId);
                                        label.save();
                                        console.log('-=-=-=-=-=-=-=-=-=-=- Saving employee and label -=-=-=-=-=-=-=-=-=-=-');
                                        Deal.findById({ _id: dealId })
                                            .then((deal) => res.status(201).json({
                                                "message": "Deal has been succesfully added to employee.",
                                                "code": 201,
                                                "deal": deal
                                            }))
                                    })
                                    .catch((err) => {
                                        next(new ApiError('An error occurred while creating the deal, '+ err, 500))
                                    })
                            }
                        })
                    });
                })
            } catch (error) {
                next(new ApiError(error.message, 500))
            }
        } catch (error) {
                next(new ApiError(error.message, 500))
        }
    },

    delete(req, res, next) {

        /* further validation and preparation */
        assert(req.params.id, 'dealId must be provided');
        const dealId = req.body.dealId;

        Deal.findOneAndDelete({ _id: dealId })
            .then(() => res.status(200).json({
                "message": "Deal has been succesfully deleted.",
                "code": 200,
                "dealId": dealId
            }))
            .catch((err) => {
                next(new Error(err, 422))
            })
    }, 

    get(req, res, next) {
        if (req.query.id){
            const dealsId = req.query.id
            Deal.findById(dealsId)
                .then((deals) => {
                    if (deals !== null) {
                        res.status(200).json(deals)
                    } else {
                        next(new Error('Deal not found, wrong identifier.', 422))
                    }
                })
                .catch(() => {
                    next(new Error('Deal not found, wrong identifier.', 422))
                })
        } else if (req.query.companyId){
            const cId = req.query.companyId
            Deal.find({company: cId})
                .then((deals) => {
                    if (deals !== null) {
                        res.status(200).json(deals)
                    } else {
                        next(new Error('Deals not found, wrong identifier.', 422))
                    }
                })
                .catch(() => {
                    next(new Error('Deals not found, wrong identifier.', 422))
                })
        } else if (req.query.title) {
            const t = req.query.title
            Deal.find({ title: t })
                .then((deals) => {
                    if (deals !== null) {
                        res.status(200).json(deals)
                    } else {
                        next(new Error('Deals not found, wrong identifier.', 422))
                    }
                })
                .catch(() => {
                    next(new Error('Deals not found, wrong identifier.', 422))
                })
        } else {
            Deal.find({})
                .then((deals) => {
                    res.status(200).json(deals)
                })
                .catch(() => {
                    next(new Error('Deals not found, no deals have been posted yet.', 404))
                })
        }
    },
}