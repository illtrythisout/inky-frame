const { Router } = require('express');
const router = Router();
const prisma = require('../client/prisma');

const {
  updateImage,
  updateAlbum,
  getCurrentImage,
  getCurrentAlbum,
} = require('../controllers/displayController.js');

router.post('/image', updateImage);
router.post('/album', updateAlbum);

router.get('/image', getCurrentImage);
router.get('/album', getCurrentAlbum);

module.exports = router;
