var baseMatch = /(<html>[\s\S]*<head>)/m

module.exports = function (reporter, definition) {
  reporter.beforeRenderListeners.add('base', function (req, res) {
    var base = definition.options.url || req.options.base

    if (base) {
      base = base.replace('${cwd}', 'file:///' + process.cwd().replace('\\', '/')) // eslint-disable-line
      req.template.content = req.template.content.replace(baseMatch, '$1<base href=\'' + base + '\' />')
    }
  })
}
