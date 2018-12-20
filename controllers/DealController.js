const moment = require('moment');
const Deal = require('../models/Deal');
const Employee = require('../models/Employee');
const ApiError = require('../models/ApiError');
const auth = require('../auth/auth');

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

        /* binding the deal to an employee and saving it to the database */
        Employee.findById(employeeId)
            .then((employee) => {
                if (employee !== null && employee !== undefined){
                    employee.deals.push(newDeal);
                    newDeal.save()
                        .then(() => {
                            console.log('-=-=-=-=-=-=-=-=-=-=-=- Saving deal -=-=-=-=-=-=-=-=-=-=-=-');
                            const dealId = deal._id;
                            console.log(dealId);
                            employee.save();
                            console.log('-=-=-=-=-=-=-=-=-=-=- Saving employee -=-=-=-=-=-=-=-=-=-=-');
                            Deal.findById({ _id: dealId })
                                .then((deal) => res.status(201).json({
                                    "message": "Deal has been succesfully added to employee.",
                                    "code": 201,
                                    "deal": deal
                                }))
                        })
                        .catch((err) => {
                            next(new Error('An error occurred while creating the deal, '+ err, 500))
                        })
                } else {
                    next(new Error('Employee not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Employee not found, wrong identifier.', 422))
            })


    } catch (error) {
            next(new ApiError(error.message, 500))
    }
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