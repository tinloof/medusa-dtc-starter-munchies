const fs = require('node:fs');
const path = require('node:path');

const MEDUSA_SERVER_PATH = path.join(process.cwd(), '.medusa', 'server');

// Check if .medusa/server exists - if not, build process failed
if (!fs.existsSync(MEDUSA_SERVER_PATH)) {
  throw new Error('.medusa/server directory not found. This indicates the Medusa build process failed. Please check for build errors.');
}

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