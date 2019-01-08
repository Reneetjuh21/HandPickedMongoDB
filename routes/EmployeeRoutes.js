const employee_controller = require('../controllers/EmployeeController');
const express = require('express');
const router = express.Router();

router.post('/employees/:id', employee_controller.create)
router.put('/employees/:labelId/:employeeId', employee_controller.edit)
router.delete('/employees/:labelId/:employeeId', employee_controller.delete)
router.get('/employees/:id', employee_controller.getByLabelId)

module.exports = router;