/*
    companyRoutes.js - Routing the requests for companies
 */

/* Requiring the necessary libraries and assets */
const company_controller = require('../controllers/CompanyController');
const express = require('express');

/* Creating the express router */
const router = express.Router();

/* The POST company request */
router.post('/companies', company_controller.create);

//TODO - CLEANUP?
// router.put('/concerts', company_controller.edit)
// router.delete('/concerts', company_controller.delete)
router.get('/companies', company_controller.get)
router.get('/companies/:id', company_controller.getById)
router.get('/companies/:name', company_controller.getByName)

/* The GET all companies request */
router.get('/companies', company_controller.get);

/* The GET company request */
router.get('/companies/:id', company_controller.getById);

/* Exporting the routes so they can be used by the other classes */
module.exports = router;