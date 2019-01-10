/*
    ContactRoutes.js - Routing the requests for contacts
 */

/* Requiring the necessary libraries and assets */
const contact_controller = require('../controllers/ContactController');
const express = require('express');

/* Creating the express router */
const router = express.Router();

router.post('/contacts', contact_controller.create)
router.put('/contacts/:id', contact_controller.edit)
router.delete('/contacts/:id', contact_controller.delete)
router.get('/contacts', contact_controller.get)

/* The GET all contacts request */
router.get('/contacts', contact_controller.get);

/* The GET contact request */
router.get('/contacts/:id', contact_controller.getById);

/* Exporting the routes so they can be used by the other classes */
module.exports = router;