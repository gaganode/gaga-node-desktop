const logger = require('../common/logger')
const { IS_WIN } = require('../common/consts')
const setupProc = require('./process')

const setupApphubCtl = (opt) => {
  const task = setupProc(opt, { name: 'apphub' });

  const running_id = async () => {
    const args = ["running_id", "--json=true"];
    let ck_status = "";

    const readyHandler = (data) => {
      const output = data.toString();
      const resp = JSON.parse(output);
      if (resp["meta_status"] == 1) {
        ck_status = resp["id"];
      }
    }

    await task.commonExec(args, readyHandler);

    return ck_status;
  }

  const local_id = async () => {
    const args = ["local_id", "--json=true"];
    let ck_status = ""

    const readyHandler = (data) => {
      const output = data.toString();
      const resp = JSON.parse(output);
      if (resp["meta_status"] == 1) {
        ck_status = resp["id"];
      }
    }
    
    await task.commonExec(args, readyHandler);

    return ck_status;
  }

  const statusService = async () => {
    const args = ["service", "status"];

    let output = '';
    let ck_status = "";

    let readyHandler;
    
    if (!IS_WIN) {
      readyHandler = (data) => {
        output += data.toString()
        const notInstallMatch = output.trim().match(/not installed/);
        if ((notInstallMatch != null) && notInstallMatch.length > 0) {
          ck_status = "to_isntall";
          return;
        }

        const stopMatch = output.trim().match(/is stopped/);
        if ((stopMatch != null) && stopMatch.length > 0) {
          ck_status = "to_start";
          return;
        }

        const runningMatch = output.trim().match(/is running/);
        if ((runningMatch != null) && runningMatch.length > 0) {
          ck_status = "is_running";
          return;
        }
      }
    } else {
      readyHandler = (data) => {
        output += data.toString();
        const notInstallMatch = output.trim().match(/service does not exist as an installed/);
        if ((notInstallMatch != null) && notInstallMatch.length > 0) {
          ck_status = "to_isntall";
          return;
        }

        const stopMatch = output.trim().match(/SERVICE_STOPPED/);
        if ((stopMatch != null) && stopMatch.length > 0) {
          ck_status = "to_start";
          return;
        } else {
          ck_status = "is_running";
          return;
        }
      }
    }
    
    await task.commonExec(args, readyHandler);

    return ck_status;
  }

  const install = async () => {
    const args = ['service', 'install'];

    let output = '';
    let isInstall = false;

    const readyHandler = (data) => {
      output += data.toString();
      const isMatch = output.trim().match(/install app/);
      if ((isMatch != null) && isMatch.length > 0) {
        isInstall = true;
      }
    }
    
    await task.commonExec(args, readyHandler);

    return isInstall;
  }

  const remove = async () => {
    const args = ['service', 'remove'];
    await task.commonExec(args, null);
  }

  const killApp = async () => {
    if (!IS_WIN) {
      return;
    }

    const killTask = setupProc({ bin: 'taskkill.exe' }, { name: 'kill' });

    const args = ['/f', '/im', 'gaganode.exe'];

    // not wait or it stuck here
    killTask.commonExec(args, null);
  }

  const daemonStart = async () => {
    const args = ['service', 'start'];
    await task.commonExec(args, null);
  }

  const restartApp = async (handle) => {
    const args = ["restart"];

    const readyHandler = (data) => {
      handle(data.toString());
    }

    await task.commonExec(args, readyHandler);
  }

  const statusApp = async (handle) => {
    const args = ["status"];

    const readyHandler = (data) => {
      handle(data.toString());
    }
  
    await task.commonExec(args, readyHandler);
  }

  const healthApp = async (handle) => {
    const args = ["health", "--name=gaganode"];

    const readyHandler = (data) => {
      handle(data.toString());
    }
  
    await task.commonExec(args, readyHandler);
  }

  logger.debug(`[apphub] setup Apphub Ctl end`);

  return {
    running_id,
    local_id,
    statusService,
    install,
    remove,
    daemonStart,
    killApp,
    restartApp,
    statusApp,
    healthApp
  };
}

module.exports = setupApphubCtl;