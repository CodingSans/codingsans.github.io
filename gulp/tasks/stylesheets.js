var gulp                = require('gulp');
var sass                = require('gulp-sass');
var notify              = require('gulp-notify');
var sourcemaps          = require('gulp-sourcemaps');

var configBase          = require('../config');
var config              = configBase.stylesheets;
var errorHandler        = require('../utils/errorHandler');
var renameToExtension   = require('../utils/renameToExtension');

gulp.task('stylesheets', function () {

  return gulp.src(config.src)
    .pipe(errorHandler())

    .pipe(sourcemaps.init())
      .pipe(sass())
    .pipe(sourcemaps.write())

    .pipe(renameToExtension('.css'))
    .pipe(gulp.dest(config.dest))
    .pipe(notify({
      onLast : true,
      message : 'Stylesheets task done.'
    }));

});

gulp.task('watch:stylesheets', function() {
  gulp.watch(config.watch, configBase.watch.options, ['stylesheets']);
});
