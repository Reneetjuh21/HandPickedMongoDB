const moment = require('moment');
const Label = require('../models/Label');
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

    edit(req, res, next){
        try {

            /* validation */
            assert(req.params.labelId, 'labelId must be provided');
            assert(req.params.employeeId, 'employeeId must be provided');
            assert(req.body.name, 'name must be provided');
            assert(req.body.email, 'email must be provided');

            const labelId = req.params.labelId
            const employeeId = req.params.employeeId
            const name = req.body.name
            const email = req.body.email

            Label.findById({ _id: labelId })
                .then((label) => {
                    if (label !== null && label !== undefined) {
                        const employee = label.employees.id(employeeId);

                        if (name !== null && name !== undefined){
                            employee.name = name
                        }

                        if (email !== null && email !== undefined){
                            employee.email = email
                        }

                        label.save();
                        Label.findById(labelId)
                            .then((label) => res.status(201).json({
                                "message": "Employee has been succesfully edited.",
                                "code": 201,
                                "label": label
                            }))
                    } else {
                        next(new ApiError('Label not found, wrong identifier.', 422))
                    }
                })
                .catch((error) => {
                    next(new ApiError('Label not found, wrong identifier.'+ error, 422))
                    console.log(error)
                })
        } catch (error) {
            next(new ApiError(error.message, 500))
        }
    },

    delete(req, res, next) {
        try {
            /* validation */
            assert(req.params.labelId, 'labelId must be provided');
            assert(req.params.employeeId, 'employeeId must be provided');

            const labelId = req.params.labelId
            const employeeId = req.params.employeeId

            Label.findById({ _id: labelId })
                .then((label) => {
                    if (label !== null && label !== undefined) {
                        const employee = label.employees.id(employeeId);

                        employee.remove()

                        label.save();
                        Label.findById(labelId)
                            .then((label) => res.status(201).json({
                                "message": "Employee has been succesfully deleted to Label.",
                                "code": 201,
                                "label": label
                            }))
                    } else {
                        next(new ApiError('Label not found, wrong identifier.', 422))
                    }
                })
                .catch((err) => {
                    next(new Error(err, 422))
                })
        }
        catch (error) {
            next(new ApiError(error.message, 500))
        }
    },

    get(req, res, next){
        if (req.query.labelId){
            const labelsId = req.query.labelId
            Label.findById(labelsId)
                .then((labels) => {
                    if (labels !== null) {
                        res.status(200).json(labels.employees)
                    } else {
                        next(new Error('Label not found, wrong identifier.', 422))
                    }
                })
                .catch(() => {
                    next(new Error('Label not found, wrong identifier.', 422))
                })
        } else if (req.query.id) {
            Label.find({}, function (err, labels) {
                labels.forEach(function (label) {
                    label.employees.forEach(function (employee) {
                        if (employee.id == req.query.id) {
                            res.status(200).json(employee)
                        }
                    })
                })
            })

        } else if (req.query.name) {
            Label.find({}, function (err, labels) {
                labels.forEach(function (label) {
                    label.employees.forEach(function (employee) {
                        if (employee.name == req.query.name) {
                            res.status(200).json(employee)
                        }
                    })
                })
            })
        } else  {
            var array = [];
            Label.find({}, function (err, labels) {
                labels.forEach(function (label) {
                    label.employees.forEach(function (employee) {
                        array.push(employee);
                    })
                    .then(() => {
                        res.status(200).json(array);
                    })
                })
            })
        
    }
}