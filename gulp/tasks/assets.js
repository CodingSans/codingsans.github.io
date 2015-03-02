var gulp                = require('gulp');
var browserSync         = require('browser-sync');
var reload              = browserSync.reload;

var configBase          = require('../config');
var config              = configBase.assets;
var errorHandler        = require('../utils/errorHandler');
var renameToExtension   = require('../utils/renameToExtension');

gulp.task('assets', function () {

  return gulp.src(config.src)
    .pipe(errorHandler())
    .pipe(gulp.dest(configBase.destFolders.dev + config.dest))

    .pipe(gulp.dest(configBase.destFolders.prod + config.dest));

});

gulp.task('watch:assets', function() {
  gulp.watch(config.watch, configBase.watch.options, ['assets']);
});
