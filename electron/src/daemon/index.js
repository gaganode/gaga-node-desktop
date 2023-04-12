const { app, ipcMain } = require('electron');
const { join } = require('path');
const logger = require('../common/logger');

const {
  setupApphub,
  healthDaemonApp,
  restartDaemonApp,
  tokenDaemonApp,
  portDaemonApp,
  getConfigDaemonApp,
  getLogDaemonApp,
  checkNodedExist,
} = require('./daemon');

const setupBackend = async (ctx) => {
  let noded = null;
  let status = null;

  const getNode = async (optional = false) => {
    if (optional) {
      return noded;
    }

    if (!noded) {
      // await nodeNotRunningDialog(ctx);
    }

    return noded;
  }

  const runAndStatus = (fn) => async () => {
    await fn();
    return status;
  }

  const restartNodeApp = async () => {
    logger.debug(`[apphub] restart`);
    await restartDaemonApp(ctx);
  }

  const statusNodeApp = async () => {
    logger.debug(`[apphub] status`);
    await healthDaemonApp(ctx);
  }

  const configNodeApp = async (config) => {
    logger.debug(`[apphub] token app ` + config);

    const res = await tokenDaemonApp(ctx, config.token);

    const res2 = await portDaemonApp(ctx, config.port);
    
    logger.info(`[apphub] token end with err:` + res.err);
  }

  ctx.restartNodeApp = runAndStatus(restartNodeApp)
  ctx.statusNodeApp = runAndStatus(statusNodeApp)
  ctx.configNodeApp = configNodeApp
  ctx.getNode = getNode

  const daemonApp = await setupApphub(ctx);
  ctx.daemonApp = daemonApp;

  app.on('before-quit', async () => {
  });
}

const setupDaemon = async (ctx) => {
  await setupBackend(ctx);

  ipcMain.on('isAppReady', async (event) => {
    logger.debug(`[app] isAppReady`);

    await checkNodedExist(ctx);
  });

  ipcMain.on('getApiToken', async (event) => {
    logger.debug(`[app] getApiToken`);

    const config = await getConfigDaemonApp(ctx);

    ctx.webui.send('displayConfig', config);
  });

  ipcMain.on('trigRestart', async (event, input) => {

    await ctx.configNodeApp(input);    
    await ctx.restartNodeApp();
    await ctx.statusNodeApp();

    const config = await getConfigDaemonApp(ctx);

    ctx.webui.send('displayConfig', config);
  });

  ipcMain.on('onAppStatus', async (event) => {
    await ctx.statusNodeApp();
  });

  await ctx.statusNodeApp();

  const myFunc = async () => {
    logger.debug(`[apphub] setTimeout myFunc`);
    await getLogDaemonApp(ctx);
  };
  
  setInterval(myFunc, 3000);
}

module.exports = setupDaemon;