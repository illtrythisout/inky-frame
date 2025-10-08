const cloudinary = require('../utils/cloudinary');

async function getRandomImage(req, res) {
  let result;

  await cloudinary.api.resources_by_asset_folder('inky-pi', {}, (err, res) => {
    result = res;
  });

  const randomImageIndex = Math.floor(Math.random() * result.total_count + 1);
  result = result.resources[randomImageIndex].secure_url;

  res.json(result);
}

module.exports = { getRandomImage };
