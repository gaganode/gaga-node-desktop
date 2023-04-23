const logger = require('../common/logger')
const { IS_WIN } = require('../common/consts')

function translateError(err) {
  // get the actual error message to be the err.message
  err.message = `${err.stdout} \n\n ${err.stderr} \n\n ${err.message} \n\n`;
  return err;
}

const setupApphub = (opt) => {

  const opts = opt
  const exec = opts.bin
  
  const commonExec = async (args, onReady) => {
    const { execa } = await import("execa")

    if (exec == null) {
      throw new Error('No executable specified');
    }

    try {
      logger.debug(`[CMD] ${exec} ${args.join(" ")}`);

      const { stdout, stderr } = await execa(exec, args, {
        // env: this.env
      })

      logger.error(`[apphub] ${stderr.toString()}`);
      logger.info(`[apphub] ${stdout.toString()}`);

      if (onReady != null) {
        onReady(stdout);
      }

    } catch(ex) {
      translateError(ex);
      throw ex;
    }
  }

  const commonExecBe = async (args, onReady) => {
    const { execa } = await import("execa")

    const funcall = new Promise((resolve, reject) => {
      if (exec == null) {
        return reject(new Error('No executable specified'));
      }

      logger.debug(`[CMD] ${exec} ${args.join(" ")}`);

      const subprocess = execa(exec, args, {
        // env: this.env
      })

      const { stdout, stderr } = subprocess;

      if (stderr == null) {
        throw new Error('stderr was not defined on subprocess');
      }

      if (stdout == null) {
        throw new Error('stdout was not defined on subprocess');
      }

      stderr.on('data', data => {
        logger.error(`[apphub] ${data.toString()}`);
      })
      stdout.on('data', data => {
        logger.info(`[apphub] ${data.toString()}`);
      })

      if (onReady != null) {
        stdout.on('data', onReady);
      }
      subprocess.catch(err => reject(translateError(err)));
      subprocess.on('exit', () => {
        stderr.removeAllListeners();
        stdout.removeAllListeners();

        resolve("");
      })
    })

    return await funcall;
  }

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

    await commonExec(args, readyHandler);

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
    
    await commonExec(args, readyHandler);

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
    
    await commonExec(args, readyHandler);

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
    
    await commonExec(args, readyHandler);

    return isInstall;
  }

  const remove = async () => {
    const args = ['service', 'remove'];
    await commonExec(args, null);
  }

  const killApp = async () => {
    if (!IS_WIN) {
      return;
    }

    const args = ['/f', '/im', 'gaganode.exe'];

    const { execa } = await import("execa")

    const process = execa('taskkill.exe', args, {
      // env: this.env
    })

    const { stdout, stderr } = process;

    if (stderr == null) {
      throw new Error('stderr was not defined on subprocess');
    }

    if (stdout == null) {
      throw new Error('stderr was not defined on subprocess');
    }

    stderr.on('data', data => {
      logger.error(`[kill] ${data.toString()}`);
    })
    stdout.on('data', data => {
      logger.info(`[kill] ${data.toString()}`);
    })

    process.on('exit', () => {
      stderr.removeAllListeners();
      stdout.removeAllListeners();
    })
  }

  const daemonStart = async () => {
    const args = ['service', 'start'];
    await commonExec(args, null);
  }

  const restartApp = async (handle) => {
    const args = ["restart"];

    const readyHandler = (data) => {
      handle(data.toString());
    }

    await commonExec(args, readyHandler);
  }

  const statusApp = async (handle) => {
    const args = ["status"];

    const readyHandler = (data) => {
      handle(data.toString());
    }
  
    await commonExec(args, readyHandler);
  }

  const healthApp = async (handle) => {
    const args = ["health", "--name=gaganode"];

    const readyHandler = (data) => {
      handle(data.toString());
    }
  
    await commonExec(args, readyHandler);
  }

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
  }
}

module.exports = setupApphub;