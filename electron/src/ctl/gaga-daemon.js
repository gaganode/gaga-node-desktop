const logger = require('../common/logger')
const setupProc = require('./process')

const setupGagaCtl = (opt) => {

  const task = setupProc(opt, { name: 'GagaTask' });

  const execute = async (args, handle) => {
    const readyHandler = (data) => {
      const output = data.toString();
      handle(output);
    }

    await task.commonExec(args, readyHandler);

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

    await task.commonExec(args, readyHandler);

    return config;
  }

  return {
    getConfig: getConfig,
    execute: execute,
  };
}

module.exports = setupGagaCtl;
