const { nativeImage } = require('electron')
const path = require('path')

function icon(status) {
  const dir = path.resolve(path.join(__dirname, '..', '..', 'resource', 'tray'));

  const img = nativeImage.createFromPath(path.join(dir, `${status}-Template.png`));
  img.setTemplateImage(true);
  return img;
}

module.exports = icon;