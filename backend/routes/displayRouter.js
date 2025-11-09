const { Router } = require('express');
const router = Router();
const prisma = require('../client/prisma');

const {
  getPiTemp,
  updateImage,
  updateAlbum,
  getCurrentImage,
  getCurrentAlbum,
} = require('../controllers/displayController.js');

router.get('/pi/temp', getPiTemp);

router.patch('/image/:id', updateImage);
router.patch('/album/:id', updateAlbum);

router.get('/image', getCurrentImage);
router.get('/album', getCurrentAlbum);

module.exports = router;
