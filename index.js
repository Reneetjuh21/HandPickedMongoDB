'use strict';

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressJWT = require('express-jwt')

const loginController = require('./controllers/LoginController')

//routes
const userRoutes = require('./routes/UserRoutes')
const loginRoutes = require('./routes/LoginRoutes')
const artistRoutes = require('./routes/ArtistRoutes')
const concertRoutes = require('./routes/ConcertRoutes')
const ticketRoutes = require('./routes/TicketRoutes')


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
    mongoose.connect('mongodb+srv://mongoUser:Kaasplankje85@cluster0-hcsa2.gcp.mongodb.net/test?retryWrites=true',
        { useNewUrlParser: true });
} else if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/MusicTickets',
        { useNewUrlParser: true });
}

// Routes
app.use('/api', loginRoutes)
app.use('/api', userRoutes)
// Everything underneath the app.all('*', loginController.validateToken) will require a token
app.use('/api', artistRoutes)
app.use('/api', concertRoutes)
app.use('/api', ticketRoutes)

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