const { app } = require('electron')
const path = require('path')
const logger = require('../common/logger')
const { IS_WIN, IS_MAC, DEFAULT_BIN_PATH, DEFAULT_APP_BIN_PATH } = require('../common/consts')
const Ctl = require('../ctl')
const {
  buildInitTokenArgs,
  buildInitPortArgs,
  buildGetConfigArgs,
  buildGetLogArgs,
  fileExists,
} = require('../ctl/utils.js')

const ExeName = 'apphub';
const AppExeName = 'gaganode';

function getDaemonBinPath() {

  const binPath = DEFAULT_BIN_PATH;

  const exeName = IS_WIN ? ( ExeName + '.exe' ) : ( ExeName );

  return path.join(binPath, exeName);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
}

async function setupApphub(ctx) {
  const noded = newNoded();

  await checkNodedInst(noded);

  await startNoded(ctx, noded);

  return noded;
}

function newNoded() {
  const bin = getDaemonBinPath();

  const noded = Ctl.newCtl({
    bin: bin,
  });

  return noded;
}

async function prepareNoded(guiView, noded) {
  let check_ret = await noded.statusService();
  if (check_ret == "is_running") {
    guiView("service is running");
    return noded;
  }

  if (check_ret == "to_isntall") {
    guiView("service begin to install");

    await noded.install();
    check_ret = "to_start";
  }

  if (check_ret == "to_start") {
    guiView("service begin to start");
    await noded.daemonStart();
  }
}

async function checkNodedInst(noded) {
  const running_id = await noded.running_id();
  const local_id = await noded.local_id();

  logger.debug(`running_id ${running_id} local_id ${local_id}`);

  if (running_id != local_id) {
    await noded.remove();

    if (IS_WIN) {
      // compatible for old apphub bug
      await sleep(2000);
      await noded.killApp();
    }
  }
}

async function checkNodedExist(ctx) {
  const appBin = getAppBinPath();
  return nodedPathExist(ctx, appBin);
}

function nodedPathExist(ctx, appBin) {
  if (fileExists(appBin)) {
    logger.debug('[appbin] Gaganode found');
    ctx.appReady("110011");
    return true;
  }

  return false;
}

async function startNoded(ctx, noded) {
  const guiView = (msg) => {
    ctx.appReady(msg);
  };

  await prepareNoded(guiView, noded);

  const appBin = getAppBinPath();
  while (true) {
    if (nodedPathExist(ctx, appBin)) {
      return noded;
    }

    logger.debug('[appbin] Gaganode not found');
  
    ctx.appReady("Gaganode is downloading and initializing");
    await sleep(5000);
  }
}

async function restartDaemonApp(ctx) {
  const noded = ctx.daemonApp;
  if (noded === null) {
    app.quit();
    return { noded: undefined, err: new Error('get node failed'), id: undefined, logs: '' };
  }

  const handle = (msg) => {
    ctx.sendGUIView(msg);
  }
  
  try {
    await noded.restartApp(handle);
  } catch (ex) {
    logger.error(ex);
  } finally {
  }
}

async function healthDaemonApp(ctx) {
  const noded = ctx.daemonApp;
  if (noded === null) {
    app.quit();
    return { noded: undefined, err: new Error('get node failed'), id: undefined, logs: '' };
  }

  const handle = (msg) => {
    ctx.sendGUIView(msg);
  }
  
  try {
    await noded.healthApp(handle);
  } catch (ex) {
    logger.error(ex);
  } finally {
  }
}

function getAppBinPath() {
  const binPath = DEFAULT_APP_BIN_PATH;

  const exeName = IS_WIN ? ( AppExeName + '.exe' ) : ( AppExeName );

  const exeDir = 'gaganode';
  return path.join(binPath, exeDir, exeName);
}

function getGagaAppCtl() {
  const bin = getAppBinPath();

  const gagaApp = Ctl.gagaCtl({
    bin: bin,
  });

  return gagaApp;
}

async function tokenDaemonApp(ctx, token) {
  const gagaApp = getGagaAppCtl();
  if (gagaApp === null) {
    return { app: undefined, err: new Error('get node failed'), id: undefined, logs: '' };
  }

  const handle = (msg) => {
    logger.debug(`[GagaApp] ` + msg);
  }

  const args = buildInitTokenArgs(token);

  try {
    await gagaApp.execute(args, handle);
  } catch (ex) {
    logger.error(ex);
  } finally {
  }

  return { app: undefined, err: null, id: undefined, logs: '' };
}

async function portDaemonApp(ctx, port) {
  const gagaApp = getGagaAppCtl();
  if (gagaApp === null) {
    return { app: undefined, err: new Error('get node failed'), id: undefined, logs: '' };
  }

  const handle = (msg) => {
    logger.debug(`[GagaApp] ` + msg);
  }

  const args = buildInitPortArgs(port);

  try {
    await gagaApp.execute(args, handle);
  } catch (ex) {
    logger.error(ex);
  } finally {
  }

  return { app: undefined, err: null, id: undefined, logs: '' };
}

async function getConfigDaemonApp(ctx) {
  const gagaApp = getGagaAppCtl();
  if (gagaApp === null) {
    return { app: undefined, err: new Error('get node failed'), id: undefined, logs: '' };
  }

  logger.debug(`[apphub] getConfigGagaApp`);

  const args = buildGetConfigArgs();

  try {
    const config = await gagaApp.getConfig(args);
    return config;
  } catch (ex) {
    logger.error(ex);
  } finally {
  }
  return {};
}

async function getLogDaemonApp(ctx) {
  const gagaApp = getGagaAppCtl();
  if (gagaApp === null) {
    return { app: undefined, err: new Error('get node failed'), id: undefined, logs: '' };
  }

  logger.debug(`[GagaApp] getLogDaemonApp`);

  const handle = (msg) => {
    ctx.sendGUIView(msg);
  }

  const args = buildGetLogArgs();

  try {
    await gagaApp.execute(args, handle);
  } catch (ex) {
    logger.error(ex);
  } finally {
  }
}

module.exports = {
  setupApphub,
  healthDaemonApp,
  restartDaemonApp,
  tokenDaemonApp,
  portDaemonApp,
  getConfigDaemonApp,
  getLogDaemonApp,
  checkNodedExist
}
