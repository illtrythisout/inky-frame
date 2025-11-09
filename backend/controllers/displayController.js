const prisma = require('../client/prisma');
const { updateDisplay } = require('../utils/display');

async function updateImage(req, res) {
  try {
    const imageId = Number(req.params.id);

    const display = await prisma.display.findFirst();
    // update db
    await prisma.display.update({
      where: { id: display.id },
      data: { currentImageId: imageId },
    });

    // get image url
    const { url } = await prisma.image.findFirst({ where: { id: imageId } });
    // update screen
    await updateDisplay(url);

    res.json({ data: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update current image' });
  }
}

async function updateAlbum(req, res) {
  try {
    const albumId = Number(req.params.id);

    const display = await prisma.display.findFirst();
    await prisma.display.update({
      where: { id: display.id },
      data: { currentAlbumId: albumId },
    });

    res.json({ data: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update current album' });
  }
}

async function getCurrentImage(req, res) {
  try {
    const display = await prisma.display.findFirst({
      include: { currentImage: true },
    });
    const result = display.currentImage;

    res.json({ data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get current image' });
  }
}

async function getCurrentAlbum(req, res) {
  try {
    const display = await prisma.display.findFirst({
      include: { currentAlbum: { include: { images: true } } },
    });
    const result = display.currentAlbum;

    res.json({ data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get current album' });
  }
}

module.exports = {
  updateImage,
  updateAlbum,
  getCurrentImage,
  getCurrentAlbum,
};
