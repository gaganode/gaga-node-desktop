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

function getBinPath() {

  const binPath = DEFAULT_BIN_PATH;

  const exeName = IS_WIN ? ( ExeName + '.exe' ) : ( ExeName );

  return path.join(binPath, exeName);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function setupApphub(ctx) {
  const noded = newNoded();

  await checkNodedInst(noded);

  await startNoded(ctx, noded);

  return noded;
}

function newNoded() {
  const bin = getBinPath();

  const noded = Ctl.newCtl({
    bin: bin,
    remote: false,
    disposable: false,
    test: false,
  });

  return noded;
}

async function prepareNoded(handle, noded) {
  let check_ret = await noded.statusService();
  if (check_ret == "is_running") {
    handle("service is running");
    return noded;
  }

  if (check_ret == "to_isntall") {
    handle("service begin to install");

    // It's a new repository!
    await noded.install();
    check_ret = "to_start";
  }

  if (check_ret == "to_start") {
    handle("service begin to start");
    await noded.daemonStart();
  }
}

async function checkNodedInst(noded) {
  const running_id = await noded.running_id();
  const local_id = await noded.local_id();

  logger.debug(`running_id ${running_id}  local_id ${local_id}`);

  if (running_id != local_id) {
    await noded.remove();
  }
}

async function checkNodedExist(ctx) {
  const appBin = getAppBinPath();
  if (fileExists(appBin)) {
    logger.debug('[appbin] gaga found');
    ctx.appReady("110011");
  }
}

async function startNoded(ctx, noded) {
  const handle = (msg) => {
    ctx.appReady(msg);
  };

  await prepareNoded(handle, noded);

  const appBin = getAppBinPath();
  let cnt = 20;
  while (cnt > 0) {
    if (fileExists(appBin)) {
      logger.debug('[appbin] gaga found');
      ctx.appReady("110011");
      return noded;
    }
    handle("gaganode preparing");
    await sleep(5000);
    cnt = cnt - 1;

    logger.debug('[appbin] gaga not found');
  }

  app.exit();
  return null;
}


async function restartDaemonApp(ctx) {
  const noded = ctx.daemonApp;
  if (noded === null) {
    app.quit();
    return { noded: undefined, err: new Error('get node failed'), id: undefined, logs: '' };
  }

  const handle = (msg) => {
    ctx.sendRunningConsole(msg);
  }
  
  let err;

  try {
    await noded.restartApp(handle);
  } catch (e) {
    err = e;
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
    ctx.sendRunningConsole(msg);
  }
  
  try {
    await noded.healthApp(handle);

  } catch (e) {
    console.error(e);
  } finally {
  }
}

function getAppBinPath() {

  const binPath = DEFAULT_APP_BIN_PATH;

  const exeName = IS_WIN ? ( AppExeName + '.exe' ) : ( AppExeName );

  return path.join(binPath, 'gaganode', exeName);
}

function getGagaApp() {
  const bin = getAppBinPath();

  const gagaApp = Ctl.gagaCtl({
    bin: bin,
    remote: false,
    disposable: false,
    test: false,
  });

  return gagaApp;
}

async function tokenDaemonApp(ctx, token) {
  const gagaApp = getGagaApp();
  if (gagaApp === null) {
    return { app: undefined, err: new Error('get node failed'), id: undefined, logs: '' };
  }

  const handle = (msg) => {
    logger.debug(`[getGagaApp] msg`);
  }

  const args = buildInitTokenArgs(token);

  try {
    await gagaApp.execute(args, handle);
  } catch (err) {
    console.error(err);
  } finally {
  }

  return { app: undefined, err: null, id: undefined, logs: '' };
}

async function portDaemonApp(ctx, port) {
  const gagaApp = getGagaApp();
  if (gagaApp === null) {
    return { app: undefined, err: new Error('get node failed'), id: undefined, logs: '' };
  }

  const handle = (msg) => {
    logger.debug(`[getGagaApp] msg`);
  }

  const args = buildInitPortArgs(port);

  try {
    await gagaApp.execute(args, handle);
  } catch (err) {
    console.error(err);
  } finally {
  }

  return { app: undefined, err: null, id: undefined, logs: '' };
}

async function getConfigDaemonApp(ctx) {
  const gagaApp = getGagaApp();
  if (gagaApp === null) {
    return { app: undefined, err: new Error('get node failed'), id: undefined, logs: '' };
  }

  logger.debug(`[apphub] getConfigGagaApp`);

  const args = buildGetConfigArgs();

  try {
    const config = await gagaApp.getConfig(args);
    return config;
  } catch (err) {
    console.error(err);
  } finally {
  }
  return {};
}

async function getLogDaemonApp(ctx) {
  const gagaApp = getGagaApp();
  if (gagaApp === null) {
    return { app: undefined, err: new Error('get node failed'), id: undefined, logs: '' };
  }

  logger.debug(`[apphub] getLogDaemonApp`);

  const handle = (msg) => {
    ctx.sendRunningConsole(msg);
  }

  const args = buildGetLogArgs();

  try {
    await gagaApp.execute(args, handle);
  } catch (err) {
    console.error(err);
  } finally {
  }
}

// module.exports.setupApphub = setupApphub
// module.exports.healthDaemonApp = healthDaemonApp
// module.exports.restartDaemonApp = restartDaemonApp
// module.exports.tokenDaemonApp = tokenDaemonApp
// module.exports.portDaemonApp = portDaemonApp
// module.exports.getConfigDaemonApp = getConfigDaemonApp
// module.exports.getLogDaemonApp = getLogDaemonApp;
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
