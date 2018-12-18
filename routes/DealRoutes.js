const ticket_controller = require('../controllers/TicketController');
const express = require('express');
const router = express.Router();

router.post('/tickets', ticket_controller.create)
router.delete('/tickets', ticket_controller.delete)
router.get('/tickets', ticket_controller.getTicketsFromUser)

module.exports = router;