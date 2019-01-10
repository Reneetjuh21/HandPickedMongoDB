/*
    InvoiceRoutes.js - Routing the requests for threads
 */

/* Requiring the necessary libraries and assets */
const invoice_controller = require('../controllers/InvoiceController');
const express = require('express');

/* Creating the express router */
const router = express.Router();

router.post('/invoices', invoice_controller.create)
router.put('/invoices', invoice_controller.edit)
router.delete('/invoices/:id', invoice_controller.delete)
router.get('/invoices', invoice_controller.get)
router.get('/invoices/:id', invoice_controller.getById)

/* The GET all invoices request */
router.get('/invoices', invoice_controller.get);

/* The GET invoice by id request */
router.get('/invoices/:id', invoice_controller.getById);

/* Exporting the routes so they can be used by the other classes */
module.exports = router;
