const { Menu, Tray, shell, app } = require('electron');
const { IS_MAC, IS_WIN, VERSION } = require('../common/consts');
const logger = require('../common/logger');
const icon = require('./icon');

const buildMenu = (ctx) => {

  return Menu.buildFromTemplate([
    {
      label: 'Website',
      click: () => { shell.openExternal('https://gaganode.com') }
    },
    {
      label: 'Quit',
      click: () => { app.quit() },
      accelerator: IS_MAC ? 'Command+Q' : null
    }
  ]);
}

const on = 'on';
const off = 'off';

// Ok this one is pretty ridiculous:
// Tray must be global or it will break due to GC:
// https://www.electronjs.org/docs/faq#my-apps-tray-disappeared-after-a-few-minutes
let tray = null;

const setupTray = (ctx) => {
  logger.debug('[tray] starting');

  tray = new Tray(icon(on));
  let menu = null;

  const popupMenu = (event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    tray.popUpContextMenu();
  }

  if (!IS_MAC) {
    // Show the context menu on left click on other
    // platforms than macOS.
    tray.on('click', popupMenu);
  }

  const setupMenu = () => {
    menu = buildMenu(ctx);

    tray.setContextMenu(menu);
    tray.setToolTip('Gaganode Desktop');

    menu.on('menu-will-show', () => {
      // ipcMain.emit(ipcMainEvents.MENUBAR_OPEN) 
    });
    menu.on('menu-will-close', () => {
      // ipcMain.emit(ipcMainEvents.MENUBAR_CLOSE)
    });
  }

  setupMenu();

  ctx.tray = tray;
  logger.debug('[tray] started');
}

module.exports = setupTray;