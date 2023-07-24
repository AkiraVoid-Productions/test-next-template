const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '../');
const foldersToClean = ['.next', 'playwright-report', 'test-results', 'build'];
let isCleaningFailed = false;
for (const folder of foldersToClean) {
  const folderPath = path.resolve(root, folder);
  try {
    fs.rmSync(folderPath, { force: true, recursive: true });
    console.log(`Removed "${folderPath}".`);
  } catch (error) {
    isCleaningFailed = true;
    console.error(`Failed to remove "${folderPath}".`, error);
  }
}

if (isCleaningFailed) {
  process.exit(1);
}
