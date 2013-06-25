var assert = require('assert')
  , Config = require('../index')

describe('config', function () {
  var config = new Config('test/fixtures/', 'test')

  it('exposes the raw configuration object', function () {
    assert.deepEqual(config.raw, config._config)
  })

  it('looks up a configuration key', function () {
    assert.equal(config.get('foo'), 'bar')
  })

  it('looks up a deep configuration key', function () {
    assert.equal(config.get('test.key'), 'abcd')
  })

  describe('when key is an object', function () {
    before(function () {
      this.subject = config.get('test.object', {
        roger: 'roger',
        butter: {
          makes: 'good tea',
          is: 'slippery'
        }
      })
    })

    it('returns an instance of Config', function () {
      assert(this.subject instanceof Config)
    })

    it('extends the result', function () {
      assert(this.subject.get('roger'), 'roger')
    })

    it('merges the default', function () {
      assert.equal(this.subject.get('butter.is'), 'slippery')
    })

    describe('the returned Config', function () {
      it('looks up a key only on the new instance', function () {
        assert.equal(this.subject.get('key'), 'efgh')
      })
    })
  })

  describe('when a key is an array', function () {
    before(function () {
      this.subject = config.get('test.gooey')
    })

    it('returns an array', function () {
      assert(this.subject instanceof Array);
    })
  })

  describe('undefined keys', function () {
    it('returns undefined', function () {
      assert.equal(config.get('does.not.exist'), undefined)
    })

    it('returns default if provided', function () {
      assert.equal(config.get('does.not.exist', 'myDefault'), 'myDefault')
    })

    describe('when key is an object', function () {
      before(function () {
        this.subject = config.get('object.does.not.exist', {hello: 'world'})
      })

      it('returns an instance of Config', function () {
        assert(this.subject instanceof Config)
      })
    })
  });
})
