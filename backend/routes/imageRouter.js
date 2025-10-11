const { Router } = require('express');
const router = Router();

const multerUpload = require('../middleware/multer');
const imageController = require('../controllers/imageController');

// Images
router.get('/images', imageController.getAllImages);
router.get('/images/random', imageController.getRandomImage);
router.delete('/images/:id', imageController.deleteImage);

// Album image uploads
router.post(
  '/albums/:albumId/images',
  multerUpload.single('file'),
  imageController.postImage
);

// Albums
router.get('/album/', imageController.getAllAlbums);
router.post('/album/', imageController.createAlbum);
router.get('/album/:id', imageController.getAlbumContent);
router.get('/album/:id/random', imageController.getRandomAlbumContent);
router.put('/album/:id', imageController.updateAlbum);
router.delete('/album/:id', imageController.deleteAlbum);

module.exports = router;
