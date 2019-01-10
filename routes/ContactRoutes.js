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

/* The GET all contacts request */
router.get('/contacts', contact_controller.get);


/* Exporting the routes so they can be used by the other classes */
module.exports = router;