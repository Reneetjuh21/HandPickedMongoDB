/*
    index.js - project main class
 */
'use strict';

/* require necessary modules and files */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ApiError = require('./models/ApiError');
const { webPort, logger } = require('./config/config');
require('./config/mongo.db');
const expressJWT = require('express-jwt');

/* require all routes */
const contactRoutes = require('./routes/ContactRoutes');
const companyRoutes = require('./routes/CompanyRoutes');
const dealRoutes = require('./routes/DealRoutes');
const invoiceRoutes = require('./routes/InvoiceRoutes');
const employeeRoutes = require('./routes/EmployeeRoutes');
const labelRoutes = require('./routes/LabelRoutes');

/* initialize necessary express module */
let app = express();

/* server setup */
const port = process.env.PORT || webPort;
app.use(cors()); //cors permission

/* user morgan as logger and user bodyparser to parse JSON */
app.use(bodyParser.urlencoded({'extended': 'true'}));
/* parse application/x-www-form-urlencoded */
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(morgan('dev'));

/* parse all the defined endpoints */
app.use('/api', contactRoutes);
app.use('/api', companyRoutes);
app.use('/api', employeeRoutes);
app.use('/api', labelRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', dealRoutes);

/* catch all non-existing endpoint requests and report a 404 error */
app.use('*', function (req, res, next) {
    // logger.error('Non-existing endpoint')
    const error = new ApiError('Non-existing endpoint', 404)
    next(error)
});

/* Catch-all error handler according to Express documentation */
app.use((err, req, res, next) => {
    logger.error(err);
    res.status((err.code || 404)).json(err).end()
});

/* listen for incoming requests */
app.listen(port, () => {
    logger.info('-=-=-=-=-=-=-=-=-=-=- Server running, listening on port ' + port + ' -=-=-=-=-=-=-=-=-=-=-');
});

/* Export the server for testing purposes */
module.exports = app;