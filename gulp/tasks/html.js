var gulp                = require('gulp');
var browserSync         = require('browser-sync');
var reload              = browserSync.reload;

var configBase          = require('../config');
var config              = configBase.html;
var errorHandler        = require('../utils/errorHandler');
var renameToExtension   = require('../utils/renameToExtension');

gulp.task('html', function () {

  return gulp.src(config.src)
    .pipe(errorHandler())
    .pipe(renameToExtension('.html'))
    .pipe(gulp.dest(config.dest));

});

gulp.task('watch:html', function() {
  gulp.watch(config.watch, configBase.watch.options, ['html']);
});
