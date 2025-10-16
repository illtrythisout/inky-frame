const prisma = require('../client/prisma');
const cloudinary = require('../utils/cloudinary');

async function getAllImages(req, res) {
  try {
    const result = await cloudinary.api.resources_by_asset_folder('inky-frame');

    // Defensive check in case no resources found
    if (!result.resources || result.resources.length === 0) {
      return res.status(404).json({ error: 'No images found' });
    }

    // Send the URL as JSON
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}
async function getRandomImage(req, res) {
  try {
    const result = await cloudinary.api.resources_by_asset_folder('inky-frame');

    // Defensive check in case no resources found
    if (!result.resources || result.resources.length === 0) {
      return res.status(404).json({ error: 'No images found' });
    }

    // Pick a random image index (0-based)
    const randomIndex = Math.floor(Math.random() * result.resources.length);

    // Send the URL as JSON
    res.json(result.resources[randomIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}
async function postImage(req, res) {
  try {
    // return an error if no file found
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // convert buffer to base64 data URI
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // attempt to upload the image
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'inky-frame', // folder to save in cloudinary's resources
      resource_type: 'auto', // auto-detects images, pdf, videos, etc.
    });

    // save image in db
    const savedImage = await prisma.image.create({
      data: {
        savedFilename: req.file.originalname,
        url: result.secure_url,
        publicId: result.public_id,
        size: req.file.size,
        mimetype: req.file.mimetype,
        parent: { connect: { id: Number(req.params.albumId) } },
      },
    });

    res.status(201).json({ data: savedImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
}
async function deleteImage(req, res) {
  try {
    // get current image
    const currentImage = await prisma.image.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!currentImage)
      return res.status(404).json({ error: 'Image not found' });

    // delete from cloudinary
    const cloudResult = await cloudinary.uploader.destroy(
      currentImage.publicId
    );
    if (!cloudResult || cloudResult.result !== 'ok') {
      console.warn('Cloudinary delete returned:', cloudResult);
    }

    // delete from database if cloudinary delete was successful
    await prisma.image.delete({ where: { id: currentImage.id } });

    res
      .status(200)
      .json({ message: 'Deleted', data: { id: currentImage.id }, cloudResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
}

async function getAllAlbums(req, res) {
  try {
    const result = await prisma.album.findMany();

    res.json({ data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get all albums' });
  }
}
async function getAlbumContent(req, res) {
  try {
    const result = await prisma.image.findMany({
      where: { parentId: Number(req.params.id) },
    });

    res.json({ data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get images in album' });
  }
}
async function getRandomAlbumContent(req, res) {
  try {
    const result = await prisma.image.findMany({
      where: { parentId: Number(req.params.id) },
    });
    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Album is empty or not found' });
    }

    // Pick a random image index (0-based)
    const randomImage = result[Math.floor(Math.random() * result.length)];

    res.json({ data: randomImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get a random image in album' });
  }
}
async function updateAlbum(req, res) {
  try {
    const result = await prisma.album.update({
      where: { id: Number(req.params.id) },
      data: { name: req.body.name },
    });

    res.status(200).json({ data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update album' });
  }
}
async function createAlbum(req, res) {
  try {
    const result = await prisma.album.create({
      data: { name: req.body.name },
    });

    res.status(201).json({ data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create album' });
  }
}
async function deleteAlbum(req, res) {
  try {
    // delete images
    const imagesInAlbum = await prisma.image.findMany({
      where: { parentId: Number(req.params.id) },
    });
    if (imagesInAlbum.length) {
      for (let i = 0; i < imagesInAlbum.length; i++) {
        // delete from cloudinary
        const cloudResult = await cloudinary.uploader.destroy(
          imagesInAlbum[i].publicId
        );
        if (!cloudResult || cloudResult.result !== 'ok') {
          console.warn('Cloudinary delete returned:', cloudResult);
        }

        // delete from database if cloudinary delete was successful
        await prisma.image.delete({ where: { id: imagesInAlbum[i].id } });
      }
    }
    const result = await prisma.album.delete({
      where: { id: Number(req.params.id) },
    });

    res.status(200).json({
      message: 'Deleted',
      data: { album: result, images: imagesInAlbum },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete album' });
  }
}

module.exports = {
  getRandomImage,
  getAllImages,
  postImage,
  deleteImage,
  getAllAlbums,
  getAlbumContent,
  getRandomAlbumContent,
  updateAlbum,
  createAlbum,
  deleteAlbum,
};
