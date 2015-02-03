/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp     = require('gulp');
var config   = require('../config');
var browserify = require('./browserify');
var browserSync  = require('browser-sync');

gulp.task('watch', ['browserify', 'browserSync'], function(callback) {
  gulp.watch(config.less.src,   ['less']);
  gulp.watch(config.ejs.src,   ['ejs']);
});