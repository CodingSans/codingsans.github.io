var gulp         = require('gulp');
var less         = require('gulp-less');
var browserify   = require('browserify');
var handleErrors = require('../util/handleErrors');
var config       = require('../config');
var autoprefixer = require('gulp-autoprefixer');
var source       = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var minifyCss = require("gulp-minify-css");
var async        = require('async');
var sourcemaps   = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var debug = require('gulp-debug');


gulp.task('product-less', function () {
  var config = require('../config').less;
  
  return gulp.src(config.src)
      .pipe(less(config.settings))
      .on('error', handleErrors)
    .pipe(autoprefixer('last 10 versions', 'ie 9'))
    .pipe(gulp.dest(config.dest));
  
});

gulp.task('product-js', function(callback) {
  
  function browserifyThis(bundleConfig, cb) {
    var bundler = browserify(bundleConfig);
  
    return bundler
      .bundle()
      .pipe(source(bundleConfig.name))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(bundleConfig.dest))
      .on('end', function() { return cb(); });
  }
  
  async.eachSeries(config.browserify.productConfigs, browserifyThis, callback, callback);
});

gulp.task('product', ['product-less', 'product-js', 'ejs']);