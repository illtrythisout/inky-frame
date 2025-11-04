const { Router } = require('express');
const router = Router();
const prisma = require('../client/prisma');

const {
  updateDisplay,
  updateAlbum,
  getCurrentImage,
  getCurrentAlbum,
} = require('../controllers/displayController.js');

router.post('/image', async (req, res) => {
  try {
    const { imageId } = req.body;

    // update db
    const display = await prisma.display.findFirst();
    await prisma.display.update({
      where: { id: display.id },
      data: { currentImageId: imageId },
    });

    // get image
    const image = await prisma.image.findUnique({ where: { id: image } });
    if (!image) return res.status(404).json({ error: 'Image not found' });

    // update screen
    const result = await updateDisplay(image);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update display' });
  }
});
router.post('/album', updateAlbum);

router.get('/image', getCurrentImage);
router.get('/album', getCurrentAlbum);

module.exports = router;
