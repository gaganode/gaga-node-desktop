const Apphub = require('./apphub-daemon')
const GagaApp = require('./gaga-daemon')

function newAppCtl(opt) {
  return new Apphub(opt)
}

function newGagaCtl(opt) {
  return new GagaApp(opt)
}

module.exports.newCtl = newAppCtl
module.exports.gagaCtl = newGagaCtl