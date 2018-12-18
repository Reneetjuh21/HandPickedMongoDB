const deal_controller = require('../controllers/DealController');
const express = require('express');
const router = express.Router();

// router.post('/concerts', deal_controller.create)
// router.put('/concerts', deal_controller.edit)
// router.delete('/concerts', deal_controller.delete)
router.get('/deals', deal_controller.get)
router.get('/deals/:id', deal_controller.getById)

module.exports = router;