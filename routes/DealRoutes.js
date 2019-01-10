/*
    DealRoutes.js - Routing the requests for deals
 */

/* Requiring the necessary libraries and assets */
const deal_controller = require('../controllers/DealController');
const express = require('express');

/* Creating the express router */
const router = express.Router();

/* The POST deal request */
router.post('/deals', deal_controller.create);

//TODO - CLEANUP?
// router.put('/concerts', deal_controller.edit)
router.delete('/deals/:id', deal_controller.delete)

/* The GET all deals request */
router.get('/deals', deal_controller.get);

/* Exporting the routes so they can be used by the other classes */
module.exports = router;