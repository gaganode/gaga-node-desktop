const { shell, Menu } = require('electron')
const isDev = require('electron-is-dev')

const setupAppMenu = (ctx) => {

  const template = [
    { role: 'appMenu' },
    { role: 'editMenu' },
    ...isDev ? [{ role: 'viewMenu' }] : [],
    { role: 'windowMenu' },
    {
      role: 'help',
      submenu: [
        {
          label: 'Website',
          click: () => shell.openExternal('https://gaganode.com')
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

module.exports = setupAppMenu;