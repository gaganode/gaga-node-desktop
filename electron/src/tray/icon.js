const path = require('path')

function icon (status) {
  const dir = path.resolve(path.join(__dirname, '..', '..', 'resource', 'tray'))

  return path.join(dir, `${status}-icon.png`);
}

module.exports = icon;