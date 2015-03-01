var gulp        = require('gulp');
var del         = require('del');

var config      = require('../config').clear;

gulp.task('clear', function(cb) {

  del(config.files, { force : 1 }, cb);

});
