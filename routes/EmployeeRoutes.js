/*
   EmployeeRoutes.js - Routing the requests for employees
 */

/* Requiring the necessary libraries and assets */
const employee_controller = require('../controllers/EmployeeController');
const express = require('express');

/* Creating the express router */
const router = express.Router();

router.post('/employees/:id', employee_controller.create)
router.put('/employees/:labelId/:employeeId', employee_controller.edit)
router.delete('/employees/:labelId/:employeeId', employee_controller.delete)
router.get('/employees/:id', employee_controller.getByLabelId)

/* Exporting the routes so they can be used by the other classes */
module.exports = router;