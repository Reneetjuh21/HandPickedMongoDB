/*
    LabelRoutes.js - Routing the requests for threads
 */

/* Requiring the necessary libraries and assets */
const label_controller = require('../controllers/LabelController');
const express = require('express');

/* Creating the express router */
const router = express.Router();

/* The POST label request */
router.post('/labels', label_controller.create);

//TODO - CLEANUP?
router.put('/labels/:id', label_controller.edit)
router.delete('/labels/:id', label_controller.delete)

/* The GET all labels request */
router.get('/labels', label_controller.get);

/* The GET label by id request */
router.get('/labels/:id', label_controller.getById);

/* Exporting the routes so they can be used by the other classes */
module.exports = router;