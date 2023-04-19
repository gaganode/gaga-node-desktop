const logger = require('../common/logger')
const { IS_WIN } = require('../common/consts')

function translateError (err) {
  // get the actual error message to be the err.message
  err.message = `${err.stdout} \n\n ${err.stderr} \n\n ${err.message} \n\n`

  return err
}

class ApphubDaemon {

  constructor (opts) {
    this.opts = opts
    this.exec = this.opts.bin
    this.started = false
    this.initialized = false
  }

  async commonExec(args, onReady, onExit) {
    const { execa } = await import("execa")

    logger.info(`[CMD] ${this.exec} ${args}`)

    const ready = new Promise((resolve, reject) => {

      const process = execa(this.exec, args, {
        // env: this.env
      })

      const { stdout, stderr } = process

      if (stderr == null) {
        throw new Error('stderr was not defined on subprocess')
      }

      if (stdout == null) {
        throw new Error('stderr was not defined on subprocess')
      }

      stderr.on('data', data => {
        logger.error(`[apphub] ${data.toString()}`)
      })
      stdout.on('data', data => {
        logger.info(`[apphub] ${data.toString()}`)
      })

      if (onReady != null)
        stdout.on('data', onReady)

      process.on('exit', () => {
        stderr.removeAllListeners()
        stdout.removeAllListeners()

        if (onExit) {
          onExit(resolve, reject)
        } else {
          resolve("")
        }
      })
    })

    return ready
  }

  async running_id() {
    const args = ["running_id", "--json=true"];
    let ck_status = "";

    const readyHandler = (data) => {
      const output = data.toString();
      const resp = JSON.parse(output);
      if (resp["meta_status"] == 1) {
        ck_status = resp["id"];
      }
    }

    const onExit = (resolve, reject) => {
      resolve(ck_status);
    }

    return await this.commonExec(args, readyHandler, onExit);
  }

  async local_id() {
    const args = ["local_id", "--json=true"]
    let ck_status = ""

    const readyHandler = (data) => {
      const output = data.toString();
      const resp = JSON.parse(output);
      if (resp["meta_status"] == 1) {
        ck_status = resp["id"];
      }
    }
    
    const onExit = (resolve, reject) => {
      resolve(ck_status);
    }

    return await this.commonExec(args, readyHandler, onExit);
  }

  async statusService() {
    const args = ["service", "status"]

    let output = ''
    let ck_status = ""

    let readyHandler
    
    if (!IS_WIN) {
      readyHandler = (data) => {
        output += data.toString()
        const notInstallMatch = output.trim().match(/not installed/)
        if ((notInstallMatch != null) && notInstallMatch.length > 0) {
          ck_status = "to_isntall"
          return
        }

        const stopMatch = output.trim().match(/is stopped/)
        if ((stopMatch != null) && stopMatch.length > 0) {
          ck_status = "to_start"
          return
        }

        const runningMatch = output.trim().match(/is running/)
        if ((runningMatch != null) && runningMatch.length > 0) {
          ck_status = "is_running"
          return
        }
      }
    } else {
      readyHandler = (data) => {
        output += data.toString()
        const notInstallMatch = output.trim().match(/service does not exist as an installed/)
        if ((notInstallMatch != null) && notInstallMatch.length > 0) {
          ck_status = "to_isntall"
          return
        }

        const stopMatch = output.trim().match(/SERVICE_STOPPED/)
        if ((stopMatch != null) && stopMatch.length > 0) {
          ck_status = "to_start"
          return
        } else {
          ck_status = "is_running"
          return
        }
      }
    }
    
    const onExit = (resolve, reject) => {
      resolve(ck_status);
    }

    return await this.commonExec(args, readyHandler, onExit);
  }

  async install() {
    const args = ['service', 'install']

    let output = ''
    let isInstall = false

    const readyHandler = (data) => {
      output += data.toString()
      const isMatch = output.trim().match(/install app/)
      if ((isMatch != null) && isMatch.length > 0) {
        isInstall = true
      }
    }
    
    const onExit = (resolve, reject) => {
      resolve(isInstall)
    }

    const installed = await this.commonExec(args, readyHandler, onExit)

    return installed
  }

  async remove() {
    const args = ['service', 'remove']
    await this.commonExec(args, null, null)
  }

  async kill() {
    if (!IS_WIN) {
      return;
    }

    const args = ['/f', '/im', 'gaganode.exe']

    const { execa } = await import("execa")

    const process = execa('taskkill.exe', args, {
      // env: this.env
    })

    const { stdout, stderr } = process

    if (stderr == null) {
      throw new Error('stderr was not defined on subprocess')
    }

    if (stdout == null) {
      throw new Error('stderr was not defined on subprocess')
    }

    stderr.on('data', data => {
      logger.error(`[kill] ${data.toString()}`)
    })
    stdout.on('data', data => {
      logger.info(`[kill] ${data.toString()}`)
    })

    process.on('exit', () => {
      stderr.removeAllListeners()
      stdout.removeAllListeners()
    })
  }

  async daemonStart() {
    const args = ['service', 'start']
    const ready = this.commonExec(args, null, null)

    await ready
    return true
  }

  async start(handle) {
    const { execa } = await import("execa");
   
    if (!this.started) {
      const args = ["service", "start"]
      let output = ''

      const ready = new Promise((resolve, reject) => {
        if (this.exec == null) {
          return reject(new Error('No executable specified'))
        }

        logger.info(`[CMD] ${this.exec} ${args}`)

        this.subprocess = execa(this.exec, args, {
          // env: this.env
        })

        const { stdout, stderr } = this.subprocess

        if (stderr == null) {
          throw new Error('stderr was not defined on subprocess')
        }

        if (stdout == null) {
          throw new Error('stderr was not defined on subprocess')
        }

        stderr.on('data', data => {
          logger.error(data.toString())
        })
        stdout.on('data', data => {
          handle(data.toString())
          logger.info(data.toString())
        })

        const readyHandler = (data) => {
          output += data.toString()
        }
        stdout.on('data', readyHandler)
        this.subprocess.catch(err => reject(translateError(err)))
        void this.subprocess.on('exit', () => {
          this.started = false
          stderr.removeAllListeners()
          stdout.removeAllListeners()
        })
      })

      await ready
    }

    this.started = true
    return this
  }

  async stop (args) {
    return this
  }

  async restartApp (handle) {
    const { execa } = await import("execa")

    const args = ["restart"]

    logger.info(`[CMD] ${this.exec} ${args}`)

    const process = execa(this.exec, args, {
      // env: this.env
    })

    const { stdout, stderr } = process

    if (stderr == null) {
      throw new Error('stderr was not defined on subprocess')
    }

    if (stdout == null) {
      throw new Error('stderr was not defined on subprocess')
    }

    stderr.on('data', data => {
      handle(data.toString())
      logger.error(`[restart] ${data.toString()}`)
    })
    stdout.on('data', data => {
      handle(data.toString())
      logger.info(`[restart] ${data.toString()}`)
    })

    void process.on('exit', () => {
      stderr.removeAllListeners();
      stdout.removeAllListeners();
    })

    return this;
  }

  async statusApp(handle) {

    const args = ["status"];

    const readyHandler = (data) => {
      handle(data.toString());
    }
  
    await this.commonExec(args, readyHandler, null);
  }

  async healthApp(handle) {
    const args = ["health", "--name=gaganode"];

    const readyHandler = (data) => {
      handle(data.toString());
    }
  
    await this.commonExec(args, readyHandler, null);
  }
}

// export default ApphubDaemon
module.exports = ApphubDaemon