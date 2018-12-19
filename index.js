'use strict';

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressJWT = require('express-jwt')

//routes
const contactRoutes = require('./routes/ContactRoutes')
const companyRoutes = require('./routes/CompanyRoutes')
const dealRoutes = require('./routes/DealRoutes')
const invoiceRoutes = require('./routes/InvoiceRoutes')
const employeeRoutes = require('./routes/EmployeeRoutes')
const labelRoutes = require('./routes/LabelRoutes')


const ApiError = require('./models/ApiError')
const { webPort, logger } = require('./config/config')

const port = process.env.PORT || webPort

let app = express()

//Cros permission
app.use(cors())

// bodyParser parses the body from a request
// hierin zit de inhoud van een POST request.
app.use(bodyParser.urlencoded({
    'extended': 'true'
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})) // parse application/vnd.api+json as json

// Install Morgan as logger
app.use(morgan('dev'))

//Database connection (NOSQL, MONGODB)
if (process.env.NODE_ENV == 'testCloud' || process.env.NODE_ENV == 'production') {
    mongoose.connect('mongodb+srv://studdit:project@studditproject-oi4rl.azure.mongodb.net/HandPicked?retryWrites=true',
        { useNewUrlParser: true });
} else if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/HandPicked',
        { useNewUrlParser: true });
}

// Routes
app.use('/api', contactRoutes)
app.use('/api', companyRoutes)
app.use('/api', employeeRoutes)
app.use('/api', labelRoutes)
app.use('/api', invoiceRoutes)
app.use('/api', dealRoutes)

// Postprocessing; catch all non-existing endpoint requests
app.use('*', function (req, res, next) {
    // logger.error('Non-existing endpoint')
    const error = new ApiError('Non-existing endpoint', 404)
    next(error)
})

// Catch-all error handler according to Express documentation - err should always be an ApiError! 
// See also http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
    logger.error(err)
    res.status((err.code || 404)).json(err).end()
})

// Start listening for incoming requests.
app.listen(port, () => {
    logger.info('Server running on port ' + port)
})

// Testcases need our app - export it.
module.exports = app