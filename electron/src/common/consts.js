const os = require('os')
const isDev = require('electron-is-dev')
const packageJson = require('../../../package.json')
const path = require('path')

const getExtraResBase = () => {
  if (isDev) {
    return path.join(__dirname, '..', '..', '..');
  } else {
    return path.join(process.resourcesPath, 'static');
  }
}

const getExtraAppBase = () => {
  return path.join(getExtraResBase(), 'bin')
}

module.exports = Object.freeze({
  IS_MAC: os.platform() === 'darwin',
  IS_WIN: os.platform() === 'win32',
  IS_APPIMAGE: typeof process.env.APPIMAGE !== 'undefined',
  VERSION: packageJson.version,
  ELECTRON_VERSION: process.versions.electron,
  DEFAULT_BIN_PATH: path.join(getExtraAppBase()),
  DEFAULT_APP_BIN_PATH: path.join(getExtraAppBase(), 'apps'),
})
