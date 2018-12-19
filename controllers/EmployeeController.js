const moment = require('moment')
var Employee = require('../models/Employee')
const Error = require('../models/ApiError')
const auth = require('../auth/auth')

module.exports = {
    create(req, res, next){
        // var decodedUserToken = auth.decodeToken(req.get('x-access-token'), (err, payload) => {
        //     if (err) {
        //         const error = new Error("Niet geautoriseerd (geen valid token)", 401)
        //         res.status(401).json(error)
        //     } else {
        //         token = payload
        //     }
        // })

        const properties = req.body
        Employee.create(properties)
            .then(employee => {
                res.status(201).json({
                    "message": "Employee has been succesfully created.",
                    "code": 201,
                    "employee": employee
                })
            })
        .catch((err) => {
            next(new Error(err, 500))
        });
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

    get(req, res, next) {
        Employee.find({})
            .then((employees) => {
                res.status(200).json(employees)
            })
            .catch(() => {
                next(new Error('Employees not found, no employees have been posted yet.', 404))
            })
    },

    getById(req, res, next) {
        const employeeId = req.params.id
        Employee.findById(employeeId)
            .then((employee) => {
                if (employee !== null){
                    res.status(200).json(employee)
                } else {
                    next(new Error('Employee not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Employee not found, wrong identifier.', 422))
            })
    }
}