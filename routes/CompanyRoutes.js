const concert_controller = require('../controllers/ConcertController');
const express = require('express');
const router = express.Router();

router.post('/concerts', concert_controller.create)
router.put('/concerts', concert_controller.edit)
router.delete('/concerts', concert_controller.delete)
router.get('/concerts', concert_controller.get)

module.exports = router;