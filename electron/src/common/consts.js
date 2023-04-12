const os = require('os')
const packageJson = require('../../../package.json')
const path = require('path')

module.exports = Object.freeze({
  IS_MAC: os.platform() === 'darwin',
  IS_WIN: os.platform() === 'win32',
  IS_APPIMAGE: typeof process.env.APPIMAGE !== 'undefined',
  VERSION: packageJson.version,
  ELECTRON_VERSION: process.versions.electron,
  DEFAULT_BIN_PATH: path.join(__dirname, '..', '..', '..', 'bin'),
  DEFAULT_APP_BIN_PATH: path.join(__dirname, '..', '..', '..', 'bin', 'apps'),
})
