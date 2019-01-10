/*
   EmployeeRoutes.js - Routing the requests for employees
 */

/* Requiring the necessary libraries and assets */
const employee_controller = require('../controllers/EmployeeController');
const express = require('express');

/* Creating the express router */
const router = express.Router();

/* The POST employee request */
router.post('/employees/:id', employee_controller.create);

/* The PUT employee request */
router.put('/employees/:labelId/:employeeId', employee_controller.edit);

/* The DELETE employee request */
router.delete('/employees/:labelId/:employeeId', employee_controller.delete);

/* The GET employee by id request */
router.get('/employees', employee_controller.get);

/* Exporting the routes so they can be used by the other classes */
module.exports = router;