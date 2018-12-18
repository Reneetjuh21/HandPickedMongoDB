const mongoose = ('mongoose');
var Artist = require('../models/Artist')
var User = require('../models/User')

function resetTestDB(){
    User.findOneAndDelete({ "username": "Test", "password": "test222" })
        .then(() => {
            console.log('Testuser deleted')
        })
        .catch((err) => {
            console.log('No user found to delete')
        })

    Artist.findOneAndDelete({ "name": "Simply Red"})
        .then(() => {
            console.log('DB has been reset for testing purposes')
        })
        .catch((err) => {
            console.log('No artist found to delete')
        })
}

module.exports = { resetTestDB }