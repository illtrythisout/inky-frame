const { Router } = require('express');
const router = Router();

const multerUpload = require('../middleware/multer');
const imageController = require('../controllers/imageController');
const { uploader } = require('../utils/cloudinary');

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
router.get('/albums', imageController.getAllAlbums);
router.post('/albums', imageController.createAlbum);
router.get('/albums/:id', imageController.getAlbum);
router.get('/albums/:id/random', imageController.getRandomAlbumContent);
router.put('/albums/:id', imageController.updateAlbum);
router.delete('/albums/:id', imageController.deleteAlbum);

module.exports = router;
