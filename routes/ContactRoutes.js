/*
    ContactRoutes.js - Routing the requests for contacts
 */

/* Requiring the necessary libraries and assets */
const contact_controller = require('../controllers/ContactController');
const express = require('express');

/* Creating the express router */
const router = express.Router();

/* The POST contact request */
router.post('/contacts', contact_controller.create);

/* The PUT contact request */
router.put('/contacts/:id', contact_controller.edit);

/* The DELETE contact request */
router.delete('/contacts/:id', contact_controller.delete);

/* The GET all contacts request */
router.get('/contacts', contact_controller.get);

/* The GET contact request */
router.get('/contacts/:id', contact_controller.getById);

/* Exporting the routes so they can be used by the other classes */
module.exports = router;