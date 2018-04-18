var main = require('./lib/base.js')
var config = require('./jsreport.config.js')

module.exports = function (options) {
  config.options = options

  const optionsSchema = {
    type: 'object',
    properties: {
      url: { type: 'string' }
    }
  }

  config.optionsSchema = {
    base: optionsSchema,
    extensions: {
      base: optionsSchema
    }
  }

  config.main = main
  config.directory = __dirname
  return config
}
