const invoice_controller = require('../controllers/InvoiceController');
const express = require('express');
const router = express.Router();

router.post('/invoices', invoice_controller.create)
router.put('/invoices', invoice_controller.edit)
router.delete('/invoices/:id', invoice_controller.delete)
router.get('/invoices', invoice_controller.get)
router.get('/invoices/:id', invoice_controller.getById)

module.exports = router;