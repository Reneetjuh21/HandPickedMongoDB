const artist_controller = require('../controllers/ArtistController');
const express = require('express');
const router = express.Router();

router.post('/artists', artist_controller.create)
router.put('/artists', artist_controller.edit)
router.delete('/artists', artist_controller.delete)
router.get('/artists', artist_controller.get)

module.exports = router;