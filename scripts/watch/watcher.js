const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

const watchList = [
  {
    src: path.resolve(__dirname, '../../src/frontend/assets'),
    dest: path.resolve(__dirname, '../../web/themes/custom/skg_theme/assets')
  },
  {
    src: path.resolve(__dirname, '../../src/themes/skg_theme'),
    dest: path.resolve(__dirname, '../../web/themes/custom/skg_theme')
  }
];

const copyFiles = async (src, dest) => {
  try {
    await fs.copy(src, dest, { overwrite: true, errorOnExist: false });
    console.log(`Synced: ${path.relative(process.cwd(), src)}`);
  } catch (err) {
    console.error(`Error copying ${src} -> ${dest}:`, err);
  }
};

const removeFile = async (src, dest) => {
  try {
    // Calculate the relative path of the deleted file
    const relativePath = path.relative(src, dest);
    const targetPath = path.resolve(dest, relativePath);

    await fs.remove(targetPath);
    console.log(`Removed: ${targetPath}`);
  } catch (err) {
    console.error(`Error removing ${dest}:`, err);
  }
};

watchList.forEach(({ src, dest }) => {
  const watcher = chokidar.watch(src, { ignoreInitial: false, persistent: true });

  watcher
    .on('add', () => copyFiles(src, dest))
    .on('change', () => copyFiles(src, dest))
    .on('unlink', (filePath) => {
      const relative = path.relative(src, filePath);
      const target = path.join(dest, relative);
      fs.remove(target)
        .then(() => console.log(`Deleted: ${target}`))
        .catch(err => console.error(`Error deleting ${target}:`, err));
    })
    .on('unlinkDir', (dirPath) => {
      const relative = path.relative(src, dirPath);
      const target = path.join(dest, relative);
      fs.remove(target)
        .then(() => console.log(`Deleted directory: ${target}`))
        .catch(err => console.error(`Error deleting directory ${target}:`, err));
    });
});

console.log('Watching assets and theme folders...');
