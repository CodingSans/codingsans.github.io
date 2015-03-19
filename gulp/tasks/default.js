var gulp      = require('gulp');
var gulpsync  = require('gulp-sync')(gulp);

gulp.task('default', gulpsync.sync(['clear', 'build', 'watch']));

gulp.task('build', ['jshint', 'scripts', 'stylesheets', 'html', 'assets']);

gulp.task('watch', [
    'watch:jshint',
    'watch:scripts',
    'watch:stylesheets',
    'watch:html',
    'watch:assets',
    'browserSync',
  ]);
