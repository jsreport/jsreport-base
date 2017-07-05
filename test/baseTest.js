require('should')
var Reporter = require('jsreport-core')

describe('base', function () {
  var reporter

  beforeEach(function () {
    reporter = Reporter()
      .use(require('../')())

    return reporter.init()
  })

  it('should replace base if in request.options.base', function () {
    return reporter.render({
      template: {
        content: '<html><head></head><body></body></html>',
        recipe: 'html',
        engine: 'none'
      },
      options: {
        base: 'foo'
      }
    }).then(function (res) {
      res.content.toString().should.containEql('<base href=\'foo\' />')
    })
  })

  it('should replace ${cwd} with working directory', function () { // eslint-disable-line
    return reporter.render({
      template: {
        content: '<html><head></head><body></body></html>',
        recipe: 'html',
        engine: 'none'
      },
      options: {
        base: '${cwd}/foo' // eslint-disable-line
      }
    }).then(function (res) {
      res.content.toString().should.containEql('file:///' + process.cwd().replace('\\', '/') + '/foo')
    })
  })
})

describe('base with global settings', function () {
  var reporter

  beforeEach(function () {
    reporter = Reporter()
      .use(require('../')({ url: 'foo.com' }))

    return reporter.init()
  })

  it('should replace base from the global options', function () {
    return reporter.render({
      template: {
        content: '<html><head></head><body></body></html>',
        recipe: 'html',
        engine: 'none'
      }
    }).then(function (res) {
      res.content.toString().should.containEql('<base href=\'foo.com\' />')
    })
  })
})
