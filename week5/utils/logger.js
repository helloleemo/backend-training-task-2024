const pino = require('pino') //仔入
const pretty = require('pino-pretty')

module.exports = function getLogger (prefix, logLevel = 'debug') {
  return pino(pretty({
    level: logLevel,
    messageFormat: `[${prefix}]: {msg}`,
    colorize: true,
    sync: true
  }))
}
