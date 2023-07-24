const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '../');
const bundle = path.resolve(root, 'build');
const foldersToGather = [
  {
    path: '.next/standalone',
    destination: './',
  },
  { path: '.next/static', destination: './.next/static' },
  { path: 'public', destination: 'public' },
  { path: '.yarn/plugins', destination: '.yarn/plugins' },
  { path: '.yarn/releases', destination: '.yarn/releases' },
].map(folder => ({
  path: path.resolve(root, folder.path),
  destination: path.resolve(bundle, folder.destination),
}));
const filesToGather = [
  { path: '.yarnrc.yml', destination: './.yarnrc.yml' },
].map(folder => ({
  path: path.resolve(root, folder.path),
  destination: path.resolve(bundle, folder.destination),
}));

let isFailed = false;
for (const folder of foldersToGather) {
  console.log(`Gathering "${folder.path}".`);
  try {
    fs.cpSync(folder.path, folder.destination, {
      recursive: true,
    });
    console.log('Gathered');
  } catch (error) {
    console.error(`Failed to gather:`, error);
    isFailed = true;
    break;
  }
}

for (const file of filesToGather) {
  console.log(`Gathering "${file.path}".`);
  try {
    fs.copyFileSync(file.path, file.destination);
    console.log('Gathered');
  } catch (error) {
    console.error(`Failed to gather:`, error);
    isFailed = true;
    break;
  }
}

if (isFailed) {
  process.exit(1);
}
