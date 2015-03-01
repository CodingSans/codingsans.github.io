var gulp          = require('gulp');
var jshint        = require('gulp-jshint');
var notify        = require('gulp-notify');
var _             = require('lodash');
var stylish       = require('jshint-stylish');

var errorHandler  = require('../utils/errorHandler');
var failOnError   = require('../utils/jsHintFailOnError');
var configBase   = require('../config');
var config        = configBase.jshint;

function jsHintTask() {
  return gulp.src(config.src)
    .pipe(errorHandler())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(failOnError())
    .pipe(notify({
      onLast : true,
      message: 'Lint task complete'
    }));
}

gulp.task('jshint', jsHintTask);

gulp.task('watch:jshint', function() {

  gulp.watch(config.watch, configBase.watch.options, _.throttle(jsHintTask, config.throttleTime, false));

});
