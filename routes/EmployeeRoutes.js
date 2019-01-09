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

//TODO - CLEANUP?
// router.put('/concerts', employee_controller.edit)
// router.delete('/concerts', employee_controller.delete)

/* The GET employee by LabelId request */
router.get('/employees/:id', employee_controller.getByLabelId);

//TODO - FINISH?
// router.get('/employees/:id', employee_controller.getById)

/* Exporting the routes so they can be used by the other classes */
module.exports = router;