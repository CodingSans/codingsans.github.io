var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var less         = require('gulp-less');
var filter       = require('gulp-filter');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').less;
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
  browserSync.notify("Compiling LESS, please wait!");
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
      .pipe(less(config.settings))
      .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer('last 10 versions', 'ie 9'))
    .pipe(gulp.dest(config.dest))
    .pipe(filter('**/*.css'))
    .pipe(browserSync.reload({stream:true}));
});