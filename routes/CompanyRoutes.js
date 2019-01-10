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

router.post('/domainname', company_controller.createDomainName)

//TODO - CLEANUP?
// router.put('/concerts', company_controller.edit)
// router.delete('/concerts', company_controller.delete)

/* The GET all companies request */
router.get('/companies', company_controller.get);

/* Exporting the routes so they can be used by the other classes */
module.exports = router;