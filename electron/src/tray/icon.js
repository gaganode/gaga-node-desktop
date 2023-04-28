const { nativeImage } = require('electron')
const path = require('path')
const { IS_MAC } = require('../common/consts')

function icon(status) {
  const dir = path.resolve(path.join(__dirname, '..', '..', 'resource', 'tray'));

  if (IS_MAC) {
    const iconImage = path.join(dir, 'macos', `${status}-Template.png`);

    const img = nativeImage.createFromPath(iconImage);
    img.setTemplateImage(true);
    return img;
  }

  return path.join(dir, 'others', `${status}-32-common.png`)
}

module.exports = icon;