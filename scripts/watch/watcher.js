const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

const watchList = [
  {
    src: path.resolve(__dirname, '../../src/frontend/assets'),
    dest: path.resolve(__dirname, '../../web/themes/custom/skg_theme/assets'),
    exclude: []
  },
  {
    src: path.resolve(__dirname, '../../src/themes/skg_theme'),
    dest: path.resolve(__dirname, '../../web/themes/custom/skg_theme'),
    exclude: []
  },
  {
    src: path.resolve(__dirname, '../../src/frontend/src/components'),
    dest: path.resolve(__dirname, '../../web/themes/custom/skg_theme/components'),
    exclude: ['.scss', '.js']
  }
];

const isExcluded = (filePath, excludeList) => {
  return excludeList.some(ext => filePath.endsWith(ext));
};

watchList.forEach(({ src, dest, exclude }) => {
  chokidar.watch(src, { ignoreInitial: false, persistent: true })
    .on('add', filePath => {
      if (isExcluded(filePath, exclude)) return;

      const relative = path.relative(src, filePath);
      const target = path.join(dest, relative);
      fs.copy(filePath, target, { overwrite: true })
        .then(() => console.log(`Copied: ${target}`))
        .catch(err => console.error(`Error copying ${filePath}:`, err));
    })
    .on('change', filePath => {
      if (isExcluded(filePath, exclude)) return;

      const relative = path.relative(src, filePath);
      const target = path.join(dest, relative);
      fs.copy(filePath, target, { overwrite: true })
        .then(() => console.log(`Updated: ${target}`))
        .catch(err => console.error(`Error updating ${filePath}:`, err));
    })
    .on('unlink', filePath => {
      if (isExcluded(filePath, exclude)) return;

      const relative = path.relative(src, filePath);
      const target = path.join(dest, relative);
      fs.remove(target)
        .then(() => console.log(`Deleted: ${target}`))
        .catch(err => console.error(`Error deleting ${target}:`, err));
    })
    .on('unlinkDir', dirPath => {
      const relative = path.relative(src, dirPath);
      const target = path.join(dest, relative);
      fs.remove(target)
        .then(() => console.log(`Deleted directory: ${target}`))
        .catch(err => console.error(`Error deleting directory ${target}:`, err));
    });
});

console.log('Watching for changes...');