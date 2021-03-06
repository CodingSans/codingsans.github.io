var gulp                = require('gulp');
var uglify              = require('gulp-uglify');
var concat              = require('gulp-concat');
var notify              = require('gulp-notify');
var foreach             = require('gulp-foreach');
var sourcemaps          = require('gulp-sourcemaps');
var stripDebug          = require('gulp-strip-debug');
var fs                  = require('fs');
var path                = require('path');
var _                   = require('lodash');

var configBase          = require('../config');
var config              = configBase.scripts;
var errorHandler        = require('../utils/errorHandler');
var removeSourceMap     = require('../utils/removeSourceMap');
var renameToExtension   = require('../utils/renameToExtension');

function unixStylePath(filePath) {
  return filePath.split(path.sep).join('/');
}

function getGlobFromFile(filePath) {
  var content = fs.readFileSync(filePath);

  content = content instanceof Buffer && content.toString();

  var lines = content.match(/^.*((\r\n|\n|\r)|$)/gm);

  lines = lines.map(function(line) { return line.replace(/(\r\n|\n|\r)/gm, ''); });

  return lines;
}

function buildScripts(filePath) {

  var srcPath = typeof filePath !== 'function' && filePath || config.src;

  return gulp.src(srcPath)
    .pipe(errorHandler())
    .pipe(foreach(function(stream, file) {

      var globSrc = getGlobFromFile(file.path);

      var dirname = path.dirname(file.path);
      var filename = path.basename(file.path);

      return gulp.src(globSrc, {
          cwd : dirname,
          base : dirname,
          nodir : true
        })
        .pipe(errorHandler())

        .pipe(sourcemaps.init())

          .pipe(concat(filename))
          .pipe(renameToExtension('.js'))

        .pipe(sourcemaps.write({ sourceRoot : function(file) {

          file.sourceMap.sources = file.sourceMap.sources.map(function(filePath) {
            return unixStylePath(path.join('./src/scripts/', filePath));
          });

          return '.';
        } }))

        .pipe(gulp.dest(configBase.destFolders.dev + config.dest))

        .pipe(removeSourceMap())
        .pipe(stripDebug())
        .pipe(uglify())

        .pipe(gulp.dest(configBase.destFolders.prod + config.dest));

    }))
    .pipe(notify({
      onLast : true,
      message : 'Scripts task done.'
    }));
}

gulp.task('scripts', buildScripts);


gulp.task('watch:scripts', function() {

  var scriptWatchers = {};

  gulp.watch(config.watch, configBase.watch.options, function(event) {

    if(scriptWatchers[event.path]) {
      scriptWatchers[event.path].end();
      delete scriptWatchers[event.path];
    }

    var globSrc = getGlobFromFile(event.path);

    var dirname = path.dirname(event.path);

    scriptWatchers[event.path] = gulp.watch(globSrc, _.extend({
      cwd : dirname,
      base : dirname,
      nodir : true
    }, configBase.watch.options), function() {
      buildScripts(event.path);
    });

  });

});
