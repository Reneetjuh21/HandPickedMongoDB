const contact_controller = require('../controllers/ContactController');
const express = require('express');
const router = express.Router();

router.post('/contacts', contact_controller.create)
router.put('/contacts/:id', contact_controller.edit)
router.delete('/contacts/:id', contact_controller.delete)
router.get('/contacts', contact_controller.get)

module.exports = router;