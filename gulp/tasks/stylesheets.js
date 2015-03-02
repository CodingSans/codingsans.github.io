var gulp                = require('gulp');
var sass                = require('gulp-sass');
var notify              = require('gulp-notify');
var minifyCSS           = require('gulp-minify-css');
var sourcemaps          = require('gulp-sourcemaps');
var autoprefixer        = require('gulp-autoprefixer');
var path                = require('path');

var configBase          = require('../config');
var config              = configBase.stylesheets;
var errorHandler        = require('../utils/errorHandler');
var removeSourceMap     = require('../utils/removeSourceMap');
var renameToExtension   = require('../utils/renameToExtension');

gulp.task('stylesheets', function () {

  return gulp.src(config.src)
    .pipe(errorHandler())

    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer(config.autoprefix))
      .pipe(sourcemaps.write({ sourceRoot : function(file) {

        file.sourceMap.sources = file.sourceMap.sources.map(function(filePath) {
          return path.join('./src/stylesheets/', filePath);
        });

        return '.';
      } }))

    .pipe(renameToExtension('.css'))
    .pipe(gulp.dest(configBase.destFolders.dev + config.dest))

    .pipe(removeSourceMap())
    .pipe(minifyCSS())

    .pipe(gulp.dest(configBase.destFolders.prod + config.dest))
    .pipe(notify({
      onLast : true,
      message : 'Stylesheets task done.'
    }));

});

gulp.task('watch:stylesheets', function() {
  gulp.watch(config.watch, configBase.watch.options, ['stylesheets']);
});
