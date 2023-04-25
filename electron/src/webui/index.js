const { app, BrowserWindow } = require('electron')
const serve = require('electron-serve')
const isDev = require('electron-is-dev')
const path = require('path')
const logger = require('../common/logger')

let loadURL;
if (!isDev) {
  loadURL = serve({ scheme: 'webui', directory: path.join(__dirname, '..', '..', '..', 'vue', 'dist') });
}

const createWindow = async () => {

  const iconPath = path.join(__dirname, '..', '..', 'resource', 'icon.png');

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'gaganode',
    width: 1028,
    height: 960,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.platform === 'darwin') {
    app.dock.setIcon(iconPath);
  }

  try {
    // and load the index.html of the app.
    if (isDev) {
      mainWindow.loadURL('http://127.0.0.1:5173');
      // Open the DevTools.
      mainWindow.webContents.openDevTools();
    } else {
      const url = new URL('/', 'webui://-');
      mainWindow.loadURL(url.toString());
    }
  } catch(ex) {
    logger.error(ex);
  }

  mainWindow.on('close', (event) => {
    logger.debug('[ui event] close');
    event.preventDefault();
    mainWindow.setSkipTaskbar(true);   // hide task bar
    mainWindow.hide();  // hide main win
  });

  mainWindow.on('restore', () => {
    logger.debug('[ui event] restore');
    mainWindow.setSkipTaskbar(false);
  });

  app.on('before-quit', () => {
    // Makes sure the app quits even though we prevent
    // the closing of this window.
    logger.debug('[ui event] before-quit');
    mainWindow.removeAllListeners('close');
  });

  return mainWindow;
};

const setupWebUI = async (ctx) => {
  logger.debug('[webui] starting');

  ctx.webui = await createWindow();

  const sendGUIView = (msg) => ctx.webui.webContents.send('infoOut', msg)
  ctx.sendGUIView = sendGUIView;

  const appReady = (msg) => ctx.webui.webContents.send('appReady', msg)
  ctx.appReady = appReady;

  logger.debug('[webui] started');
}

module.exports = setupWebUI;