const label_controller = require('../controllers/LabelController');
const express = require('express');
const router = express.Router();

router.post('/labels', label_controller.create)
// router.put('/concerts', label_controller.edit)
// router.delete('/concerts', label_controller.delete)
router.get('/labels', label_controller.get)
router.get('/labels/:id', label_controller.getById)

module.exports = router;