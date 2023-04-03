const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve')
const isDev = require('electron-is-dev');
const path = require('path');
const logger = require('./common/logger')

let loadURL
if (!isDev) {
  loadURL = serve({ scheme: 'webui', directory: path.join(__dirname, '..', '..', 'vue', 'dist') });
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1028,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

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

 
};

async function run() {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  try {
    await app.whenReady();
  } catch (e) {
    app.exit(1);
  }

  await createWindow();

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

run();

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
