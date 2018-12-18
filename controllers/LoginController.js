var User = require('../models/User')
const Error = require('../models/ApiError')
const auth = require('../auth/auth')
const assert = require('assert')
const moment = require('moment')

module.exports = {

    validateToken(request, response, next) {
        const token = request.header('x-access-token') || '';
        auth.decodeToken(token, (error, payload) => {
            if(error) {
                response.status(401).json({
                message: "Niet geautoriseerd (geen valid token)",
                code: 401,
                datetime: moment().format()
            }).end()
            } else {
                request.user = payload.sub
                next()
            }
        })
    },

    loginUser(req,res,next){
        try {
            const body = req.body

            assert(body.username !== '', 'Username was not defined or passed as empty')
            assert(body.password !== '', 'Password was not defined or passed as empty')
            assert(typeof(body.username) === 'string', 'Username is not of type string')
            assert(typeof(body.password) === 'string', 'Password is not of type string')

            User.findOne({ username: body.username, password: body.password })
                .then((user) => {
                    const token = auth.encodeToken(user.username, user._id, user.rank);
                    res.status(200).json({
                        message: "User has been logged in successfully!",
                        success: true,
                        token: token,
                        username: user.username
                    })
                })
                .catch(() => {
                    next(new Error('Invalid user credentials.', 422))
                })
        } catch (err) {
            const error = new Error(err, 500);
            next(error)
        }
    }
}