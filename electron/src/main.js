const { app } = require('electron')
const logger = require('./common/logger')

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

const setupAppMenu = require('./app-menu');
const setupWebUI = require('./webui');
const setupDaemon = require('./daemon');
const setupTray = require('./tray');

const ctx = {};

const initApp = async (ctx) => {
  await setupAppMenu(ctx);
  await setupWebUI(ctx);
  await setupTray(ctx);
  await setupDaemon(ctx);
}

const run = async () => {
  app.on('second-instance', () => {
    const webui = ctx.webui;
    if (webui) {
      if (webui.isMinimized()) {
        webui.restore();
      }
      webui.focus();
    }
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  try {
    await app.whenReady();
  } catch (e) {
    app.exit(1);
  }

  await initApp(ctx);

  app.on('activate', () => {
    logger.debug('[ui event] activate');
    const webui = ctx.webui;
    if (webui) {
      webui.show();
      webui.focus();
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
