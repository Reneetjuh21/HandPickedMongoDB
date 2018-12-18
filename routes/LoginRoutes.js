const login_controller = require('../controllers/LoginController');
const express = require('express');
const router = express.Router();

router.post('/login', login_controller.loginUser)


module.exports = router;