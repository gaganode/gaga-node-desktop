const setupApphub = require('./apphub-daemon')
const setupGagaCtl = require('./gaga-daemon')

module.exports.newCtl = setupApphub
module.exports.gagaCtl = setupGagaCtl