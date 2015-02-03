var gulp         = require('gulp');
var ejs          = require('gulp-ejs');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').ejs;
var browserSync  = require('browser-sync');
 

gulp.task('ejs', function () {
  browserSync.notify("Compiling EJS, please wait!");
  
  return gulp.src(config.src)
    .pipe(ejs({}).on('error', handleErrors))
    .pipe(gulp.dest(config.dest));
});
 