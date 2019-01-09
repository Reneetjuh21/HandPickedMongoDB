const moment = require('moment');
const Label = require('../models/Label');
const Employee = require('../models/Employee');
const ApiError = require('../models/ApiError');
const auth = require('../auth/auth');
const assert = require('assert');


module.exports = {
    create(req, res, next){
        try {
            /* validation */
            assert(req.params.id, 'labelId must be provided');
            assert(req.body.name, 'name must be provided');
            assert(req.body.email, 'email must be provided');

            /* making constants with the items from the request's body */
            const name = req.body.name || '';
            const email = req.body.email || '';

            /* creating an employee with these constants */
            const newEmployee = { name: name, email: email };

            /* further preparation */
            const labelId = req.params.id;

            /* save the new employee to the database */
            Label.findById(labelId)
                .then((label) => {
                    if (label !== null && label !== undefined) {
                        label.employees.push(newEmployee);
                        label.save();
                        Label.findById(labelId)
                            .then((label) => res.status(201).json({
                                "message": "Employee has been succesfully added to Label.",
                                "code": 201,
                                "label": label
                            }))
                    } else {
                        next(new ApiError('Label not found, wrong identifier.', 422))
                    }
                })
                .catch(() => {
                    next(new ApiError('Label not found, wrong identifier.', 422))
                })
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

    //     const employeeId = req.body.id
    //     const properties = req.body

    //     Employee.findByIdAndUpdate({ _id: employeeId }, properties)
    //         .then(() => Employee.findById({ _id: employeeId}))
    //         .then((employee) => res.status(200).json({
    //             "message": "Employee has been succesfully edited.",
    //             "code": 200,
    //             "employee": employee
    //         }))
    //         .catch(() => {
    //             next(new Error('Employee not found, wrong identifier.', 422))
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

    //     const employeeId = req.query.id

    //     Employee.findOneAndDelete({ _id: employeeId})
    //         .then(() => res.status(200).json({
    //             "message": "Employee has been succesfully deleted.",
    //             "code": 200,
    //             "employeeId": employeeId
    //         }))
    //         .catch((err) => {
    //             next(new Error(err, 422))
    //         })
    // },

    // get(req, res, next) {
    //     Employee.find({})
    //         .then((employees) => {
    //             res.status(200).json(employees)
    //         })
    //         .catch(() => {
    //             next(new Error('Employees not found, no employees have been posted yet.', 404))
    //         })
    // },

    getByLabelId(req, res, next){
        const labelsId = req.params.id
        Label.findById(labelsId)
            .then((labels) => {
                if (labels !== null){
                    res.status(200).json(labels.employees)
                } else {
                    next(new Error('Label not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Label not found, wrong identifier.', 422))
            })
    },

    // getById(req, res, next) {
    //     const employeeId = req.params.id
    //     Employee.findById(employeeId)
    //         .then((employee) => {
    //             if (employee !== null){
    //                 res.status(200).json(employee)
    //             } else {
    //                 next(new ApiError('Employee not found, wrong identifier.', 422))
    //             }
    //         })
    //         .catch(() => {
    //             next(new ApiError('Employee not found, wrong identifier.', 422))
    //         })
    // }
}