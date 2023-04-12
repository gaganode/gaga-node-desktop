const { join } = require('path')
const fs = require('fs-extra')

function fileExists(file) {
  return fs.pathExistsSync(file)
}

// return string[]
function buildInitTokenArgs(token) {
  const args = ['config', 'set']
  
  args.push(`--token=${token}`)

  return args
}

function buildInitPortArgs(port) {
  const args = ['config', 'set']
  
  args.push(`--satellite.port=${port}`)

  return args
}

function buildGetConfigArgs() {
  const args = ['config', 'get_json']
  
  return args
}

function buildGetLogArgs() {
  const args = ['log', '--num=20']
  
  return args
}

module.exports = Object.freeze({
  buildInitTokenArgs,
  buildInitPortArgs,
  buildGetConfigArgs,
  buildGetLogArgs,
  fileExists,
})
  