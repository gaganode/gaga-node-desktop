const logger = require('../common/logger')

function translateError(err) {
  // get the actual error message to be the err.message
  err.message = `${err.stdout} \n\n ${err.stderr} \n\n ${err.message} \n\n`;
  return err;
}

const setupGagaCtl = (opt) => {

  const opts = opt;
  const exec = opts.bin;
  // const env = ;

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
        // env: env
      })

      const { stdout, stderr } = subprocess;

      if (stderr == null) {
        throw new Error('stderr was not defined on subprocess');
      }

      if (stdout == null) {
        throw new Error('stdout was not defined on subprocess');
      }

      stderr.on('data', data => {
        logger.error(`[gaga] ${data.toString()}`);
      })
      stdout.on('data', data => {
        logger.debug(`[gaga] ${data.toString()}`);
      })

      if (onReady != null) {
        stdout.on('data', onReady);
      }
      subprocess.on('exit', () => {
        stderr.removeAllListeners();
        stdout.removeAllListeners();

        resolve("");
      })
    })

    return funcall
  }

  const execute = async (args, handle) => {
    const readyHandler = (data) => {
      const output = data.toString();
      handle(output);
    }

    await commonExec(args, readyHandler);

    return "";
  }

  const getConfig = async (args) => {
    let config = {}
  
    const readyHandler = (data) => {
      const output = data.toString()
      const resp = JSON.parse(output)

      const port = resp.satellite?.port;
      const token = resp.token;
      const version = resp.package?.package_version;
     
      config.port = port;
      config.token = token;
      config.version = version;
    }

    await commonExec(args, readyHandler);

    return config;
  }

  return {
    getConfig: getConfig,
    execute: execute,
  };
}

module.exports = setupGagaCtl;
