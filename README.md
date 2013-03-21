Config
======

This is the configuration helper module you've always dreamed of. It's goal is to be declaritive and environmental which makes for easier development and testing.

## Usage

**Basic Example**

```javascript
var Config = require('config')
var sampleConfig = new Config('path/to/configs/')
// will open path/to/configs/development.json

sampleConfig.get('real.setting.no1')
```

**You can also specify a different environment**

```javascript
var sampleConfig = new Config('path/to/configs/', 'demo')
// will now open path/to/configs/demo.json
```

**Strict mode**

```javascript
var sampleConfig = new Config('path/to/configs/', undefined, true)

sampleConfig.get('fake.setting')
// throws configuration setting missing error!
```

### Default Settings

One of the main reasons I wrote `Config` is because default configuration settings are annoying! The code that requires configuration should know ahead of time what to do. With `Config` you can declare what the default should be, and it will fall back to it if your config.json doesn't say otherwise.

```javascript
var foo = sampleConfig.get('non.existent.setting', 'I am a default')
console.log(foo)
// 'I am a default'
```

