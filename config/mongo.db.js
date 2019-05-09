/*
    mongo.db.js - mongoDB database configuration
*/

const mongoose = require('mongoose');
const { logger }  = require('./config');

/* use ES6 promises instead of mongoose promise */
mongoose.Promise = global.Promise;

if(process.env.NODE_ENV === 'production'){
    logger.info('-=-=-=-=-=-=-=-=-=-=- Connecting to PRODUCTION database -=-=-=-=-=-=-=-=-=-=-');
    mongoose.connect('',
        {useNewUrlParser: true});

} else if(process.env.NODE_ENV === 'online-testing'){
    logger.info('-=-=-=-=-=-=-=-=-=-=- Connecting to ONLINE TESTING database -=-=-=-=-=-=-=-=-=-=-');
    mongoose.connect('',
        {useNewUrlParser: true});

}

/* else */ if(process.env.NODE_ENV === 'development'){
    logger.info('-=-=-=-=-=-=-=-=-=-=- Connecting to DEVELOP database -=-=-=-=-=-=-=-=-=-=-');
    mongoose.connect('mongodb://localhost/HandPicked',
        {useNewUrlParser: true});

} else if(process.env.NODE_ENV === 'testing'){
    logger.info('-=-=-=-=-=-=-=-=-=-=- Connecting to TESTING database -=-=-=-=-=-=-=-=-=-=-');
    mongoose.connect('mongodb://localhost/HandPickedTest',
        {useNewUrlParser: true});
}

/* mongoose connection to mongoDB database */
var connection = mongoose.connection
    .once('open', () => logger.info('-=-=-=-=-=-=-=-=-=-=- Connected to Mongo Database -=-=-=-=-=-=-=-=-=-=-')) //connection succeeded
    .on('error', (error) => logger.error(error.toString())); // connection failed

/* export the class for use elsewhere */
module.exports = connection;