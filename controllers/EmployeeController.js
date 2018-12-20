const moment = require('moment')
var Label = require('../models/Label')
const Error = require('../models/ApiError')
const auth = require('../auth/auth')

module.exports = {
    create(req, res, next){
        const labelId = req.params.id
        const properties = req.body
        const employee = {
            "name": properties.name,
            "email": properties.email
        }

        Label.findById(labelId)
            .then((label) => {
                if (label !== null && label !== undefined) {
                    label.employees.push(employee)
                    label.save()
                    Label.findById({labelId})
                        .then((label) => res.status(201).json({
                            "message": "Employee has been succesfully added to Label.",
                            "code": 201,
                            "label": label
                        }))
                } else {
                    next(new Error('Label not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Label not found, wrong identifier.', 422))
            })
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
        const labelId = req.params.labelId

        Label.find({_id: labelId})
            .then((label) => {
                res.status(200).json(label.employees)
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