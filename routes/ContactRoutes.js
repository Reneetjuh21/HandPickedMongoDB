const contact_controller = require('../controllers/ContactController');
const express = require('express');
const router = express.Router();

router.post('/contacts', contact_controller.create)
// router.put('/concerts', contact_controller.edit)
// router.delete('/concerts', contact_controller.delete)
// router.get('/contacts', contact_controller.get)
router.get('/contacts/:id', contact_controller.getById)
router.get('/contacts', contact_controller.getByEmail)

module.exports = router;