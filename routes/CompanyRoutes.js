const company_controller = require('../controllers/CompanyController');
const express = require('express');
const router = express.Router();

router.post('/companies', company_controller.create)
// router.put('/concerts', company_controller.edit)
// router.delete('/concerts', company_controller.delete)
router.get('/companies', company_controller.get)
router.get('/companies/:id', company_controller.getById)

module.exports = router;