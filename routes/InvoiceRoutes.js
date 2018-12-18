const invoice_controller = require('../controllers/InvoiceController');
const express = require('express');
const router = express.Router();

// router.post('/concerts', invoice_controller.create)
// router.put('/concerts', invoice_controller.edit)
// router.delete('/concerts', invoice_controller.delete)
router.get('/invoices', invoice_controller.get)
router.get('/invoices/:id', invoice_controller.getById)

module.exports = router;