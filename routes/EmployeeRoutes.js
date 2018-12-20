const employee_controller = require('../controllers/EmployeeController');
const express = require('express');
const router = express.Router();

router.post('/employees', employee_controller.create)
// router.put('/concerts', employee_controller.edit)
// router.delete('/concerts', employee_controller.delete)
router.get('/employees', employee_controller.getByLabelId)
router.get('/employees/:id', employee_controller.getById)

module.exports = router;