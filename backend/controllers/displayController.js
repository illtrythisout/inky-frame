const { execFile } = require('child_process');
const util = require('util');
const execFilePromise = util.promisify(execFile);
const path = require('path');

async function updateDisplay(imageUrl) {
  try {
    const scriptPath = path.join(__dirname, '../../pi/display-image.py');
    const { stdout, stderr } = await execFilePromise('python3', [
      scriptPath,
      imageUrl,
    ]);
    if (stderr) console.warn('Python stderr:', stderr);
    console.log('Display updated:', stdout);
    return { success: true, output: stdout };
  } catch (err) {
    console.error('Failed to update display:', err);
    return { success: false, error: err.message };
  }
}

module.exports = { updateDisplay };
