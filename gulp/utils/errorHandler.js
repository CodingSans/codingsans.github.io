var gutil      = require('gulp-util');
var notify     = require('gulp-notify');
var plumber    = require('gulp-plumber');

var notifyOnError = notify.onError('Error: <%= error.message %>');

function onError(err) {
  gutil.beep();
  gutil.log(gutil.colors.green(err));
  notifyOnError(err);
  this.emit('end');
}

module.exports = function errorHandler() {
  return plumber({ errorHandler : onError });
};
