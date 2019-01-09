const employee_controller = require('../controllers/EmployeeController');
const express = require('express');
const router = express.Router();

router.post('/employees/:id', employee_controller.create)
// router.put('/concerts', employee_controller.edit)
// router.delete('/concerts', employee_controller.delete)
router.get('/employees/:id', employee_controller.getByLabelId)
//router.get('/employee/:id', employee_controller.getById)

module.exports = router;