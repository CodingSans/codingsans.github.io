var stream = require('gulp-jshint/src/stream');
var PluginError = require('gulp-util').PluginError;

module.exports = function jsHintFailOnError(opts) {
  opts = opts || {};

  // @type false|[]paths - paths to files that failed jshint
  var fails = false;

  // @type false|[]files - files that need to be passed downstream on flush
  var buffer = opts.buffer !== false ? [] : false;

  return stream(
    function through(file) {
      // check for error
      if (file.jshint && !file.jshint.success && !file.jshint.ignored && file.jshint.results.some(function(data) {
        return data.error && data.error.code && data.error.code.indexOf('E') === 0;
      })) {
        (fails = fails || []).push(file.path);
      }

      // buffer or pass downstream
      (buffer || this).push(file);
    }, function flush() {
      if (fails) {
        this.emit('error', new PluginError('gulp-jshint', {
          message: 'JSHint failed for: ' + fails.join(', '),
          showStack: false
        }));
      }

      if (buffer) {
        // send the buffered files downstream
        buffer.forEach(function (file) {
          this.push(file);
        }, this);
      }
    }
  );
};
