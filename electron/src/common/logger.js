const { createLogger, format, transports } = require('winston')
const { join } = require('path')
const { app } = require('electron')

const { combine, splat, timestamp, printf } = format
const logsDir = app.getPath('userData')
const logsFilePath = join(logsDir, 'combined.log')

const errorFile = new transports.File({
  level: 'error',
  filename: join(logsDir, 'error.log')
})

errorFile.on('finish', () => {
  process.exit(1)
})

const logger = createLogger({
  format: combine(
    timestamp(),
    splat(),
    printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      silent: process.env.NODE_ENV === 'production'
    }),
    errorFile,
    new transports.File({
      level: 'debug',
      filename: join(logsDir, 'combined.log')
    })
  ]
})

logger.info(`[meta] logs can be found on ${logsDir}`)

module.exports = Object.freeze({
  start: (msg, opts = {}) => {
    const start = performance.now()
    logger.info(`${msg} STARTED`)

    return {
      end: () => {
        const seconds = (performance.now() - start) / 1000

        logger.info(`${msg} FINISHED ${seconds}s`)
      },
      info: (str) => {
        logger.info(`${msg} ${str}`)
      },
      fail: (err) => {
        logger.error(`${msg} ${err.stack}`)
      }
    }
  },
  info: (msg, opts = {}) => {
    logger.info(msg)
  },

  error: (err) => {
    logger.error(err)
  },

  debug: (msg, opts = {}) => {
    if (process.env.NODE_ENV === 'dev') {
      logger.debug(msg)
    }
  },

  logsDir,
  logsFilePath,
})
