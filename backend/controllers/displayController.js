const prisma = require('../client/prisma');

async function updateAlbum(req, res) {
  try {
    const { albumId } = req.body;

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
  updateAlbum,
  getCurrentImage,
  getCurrentAlbum,
};
