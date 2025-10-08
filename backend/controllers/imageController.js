const cloudinary = require('../utils/cloudinary');

async function getRandomImage(req, res) {
  try {
    const result = await cloudinary.api.resources_by_asset_folder('inky-pi');

    // Defensive check in case no resources found
    if (!result.resources || result.resources.length === 0) {
      return res.status(404).json({ error: 'No images found' });
    }

    // Pick a random image index (0-based)
    const randomIndex = Math.floor(Math.random() * result.total_count + 1);

    // Send the URL as JSON
    res.json(result.resources[randomIndex].secure_url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}

module.exports = { getRandomImage };
