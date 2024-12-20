const fs = require('node:fs');
const path = require('node:path');

const distPublicDir = path.join(__dirname, '..', 'dist', 'public');
const publicDir = path.join(__dirname, '..', 'public');

function movePublicDirectory() {
  if (fs.existsSync(distPublicDir) && !fs.existsSync(publicDir)) {
    fs.renameSync(distPublicDir, publicDir);
    console.log('Moved dist/public to public');
  } else if (fs.existsSync(distPublicDir) && fs.existsSync(publicDir)) {
    console.log('public directory already exists. Skipping move.');
  } else {
    console.log('dist/public directory does not exist. Skipping move.');
  }
}

movePublicDirectory();