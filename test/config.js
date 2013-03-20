var assert = require('assert')
  , Config = require('../index')

describe('config', function () {
  var config = new Config('test/fixtures/', 'test')

  it('looks up a configuration key', function () {
    assert(config.get('foo') === 'bar')
  })

  it('looks up a deep configuration key', function () {
    assert(config.get('test.key') === 'abcd')
  })

  describe('undefined keys', function () {
    it('returns undefined', function () {
      assert(config.get('does.not.exist') === undefined)
    })

    it('returns default if provided', function () {
      assert(config.get('does.not.exist', 'myDefault') === 'myDefault')
    })
  });
})
