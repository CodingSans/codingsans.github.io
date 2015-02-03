/* browserify task
   ---------------
   Bundle javascripty things with browserify!
   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.
   See browserify.bundleConfigs in gulp/config.js
*/

var browserify   = require('browserify');
var browserSync  = require('browser-sync');
var watchify     = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var config       = require('../config').browserify;
var _            = require('lodash');
var async        = require('async');

var browserifyTask = function(callback) {

  function browserifyThis(bundleConfig, cb) {
    var bundler = browserify(bundleConfig);
    var watcher  = watchify(bundler);

    return watcher
      .on('update', function () { // When any files update
        var updateStart = Date.now();
        
        browserSync.notify('Compiling JS, please wait!');
        
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .on('error', handleErrors)
        .pipe(source(bundleConfig.name))
        // This is where you add uglifying etc.
        .pipe(gulp.dest(bundleConfig.dest))
        .pipe(browserSync.reload({stream:true}));
      })
      .bundle() // Create the initial bundle when starting the task
      .on('error', handleErrors)
      .pipe(source(bundleConfig.name))
      .pipe(gulp.dest(bundleConfig.dest))
      .on('end', function() { return cb(); })
      .pipe(browserSync.reload({stream:true}));
  }
  
  async.eachSeries(config.bundleConfigs, browserifyThis, callback, callback);
};

gulp.task('browserify', browserifyTask);

// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = browserifyTask;