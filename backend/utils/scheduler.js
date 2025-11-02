const cron = require('node-cron');
const { updateDisplay } = require('../controllers/displayController');
const prisma = require('../client/prisma');

// Run everyday at 04:00
cron.schedule('0 4 * * *', async () => {
  console.log('Running daily display update...');

  try {
    // fetch current album from prisma
    const display = await prisma.display.findFirst({
      include: {
        currentAlbum: { include: { images: true } },
        currentImage: true,
      },
    });
    const currentAlbum = display.currentAlbum;

    if (!currentAlbum) {
      console.warn('No album found to display.');
      return;
    }

    // Pick a random image
    const randomIndex = Math.floor(Math.random() * currentAlbum.images.length);
    const randomImage = currentAlbum.images[randomIndex];

    // update display
    const result = await updateDisplay(randomImage.url); //args currentImage
    const date = new Date();
    console.log('Update result:', result, '\nDate:', date);
  } catch (err) {
    const date = new Date();
    console.error('Error during scheduled update:', err, '\nDate:', date);
  }
});
