const logger = require('../common/logger')

function translateError (err) {
  // get the actual error message to be the err.message
  err.message = `${err.stdout} \n\n ${err.stderr} \n\n ${err.message} \n\n`

  return err
}

class Daemon {

  constructor (opts) {
    this.opts = opts
    this.exec = this.opts.bin
    this.started = false
    this.initialized = false
  }

  async commonExec (args, onReady, onExit) {
    const { execa } = await import("execa")

    logger.debug(`[CMD] ${this.exec} ${args}`)

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
        logger.debug(`[apphub] ${data.toString()}`)
      })

      if (onReady != null)
        stdout.on('data', onReady)

      void process.on('exit', () => {
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

  async execute (args, handle) {

    const readyHandler = (data) => {
      const output = data.toString();
      handle(output);
    }

    const ready = this.commonExec(args, readyHandler, null)

    const ret = await ready

    return ret
  }

  async getConfig (args) {

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

    const ready = this.commonExec(args, readyHandler, null)

    await ready;

    return config;
  }

  async start (handle) {
    const { execa } = await import("execa");
   
    if (!this.started) {
      const args = []
      let output = ''

      const ready = new Promise((resolve, reject) => {
        if (this.exec == null) {
          return reject(new Error('No executable specified'))
        }

        logger.debug(`[CMD] ${this.exec} ${args}`)

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
          logger.debug(data.toString())
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
}

// export default Daemon
module.exports = Daemon