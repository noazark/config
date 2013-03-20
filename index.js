var fs = require('fs')
  , _ = require('underscore')

var Config = module.exports = (function() {
  function Config (path, environment, strict) {
    this.path = path || process.cwd() + '/config'
    this.environment = environment || process.env.NODE_ENV || 'development'
    this.strict = strict || false

    try {
      this._configFile = fs.readFileSync(path + '/' + this.environment + '.json')
      this._config = JSON.parse(this._configFile)
    } catch (e) {
      if (e.code === "ENOENT" && this.environment === 'development') {
        this._config = {}
      } else {
        throw e
      }
    }
  }

  return Config
})();

Config.prototype.get = function(path, d) {
  var paths = path.split('.')
    , current = this._config
    , i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      if (this.strict) throw new Error('Undefined Config Key: ' + path + ', using default ' + d)
      return d;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}