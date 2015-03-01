var beep       = require('beepbeep');
var gutil      = require('gulp-util');
var notify     = require('gulp-notify');
var plumber    = require('gulp-plumber');

var notifyOnError = notify.onError('Error: <%= error.message %>');

function onError(err) {
  beep([0, 0, 0]);
  gutil.log(gutil.colors.green(err));
  notifyOnError(err);
  this.emit('end');
}

module.exports = function errorHandler() {
  return plumber({ errorHandler : onError });
};
