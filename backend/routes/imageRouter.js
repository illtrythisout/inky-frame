const { Router } = require('express');
const router = Router();

const imageController = require('../controllers/imageController');

router.get('/', imageController.getRandomImage);

module.exports = router;
