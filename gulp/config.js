var gutil = require('gulp-util');

var dest = './';
var src = './src/';

module.exports = {
  destFolders : {
    prod : './',
    dev : './dev/',
  },
  browserSync : {
    server : {
      baseDir : !gutil.env.prod ? 'dev/' : './',
    },
    port : 8080,
    injectChanges : true,
    watch : ['**/*.{html}', 'assets/**/*.{js,css}', '!node_modules/**/*', '!src/**/*', '!gulp/**/*'],
  },
  jshint : {
    src : ['src/**/*.js', 'gulp/**/*.js', '!src/bower_components/**/*'],
    watch : ['src/**/*.js', 'gulp/**/*.js', '!src/bower_components/**/*'],
    throttleTime : 30000
  },
  stylesheets : {
    autoprefix : ['last 5 versions', '>1%', 'Firefox ESR', 'Opera >= 12.1', 'IE >= 8'],
    src : src + 'stylesheets/**/*.css',
    dest : '/assets/css/',
    watch : src + 'stylesheets/**/*.{css,scss,sass}',
    sourcemapRoot : src + 'stylesheets/',
  },
  scripts : {
    src : [src + 'scripts/**/*.js.glob'],
    dest : dest + '/assets/js/',
    watch : src + 'scripts/**/*.js.glob',
    sourcemapRoot : src + 'scripts/',
  },
  html : {
    src : src + '/html/**/*.html.html',
    dest : dest,
    watch : [src + '/html/**/*.html.html'],
  },
  assets : {
    src : src + '/assets/**/*',
    dest : dest + '/assets/',
    watch : [src + '/assets/**/*'],
  },
  clear : {
    files : ['**/*.{html}', 'assets/**/*', 'dev/**/*', '!node_modules/**/*', '!src/**/*', '!gulp/**/*'],
  },
  watch : {
    options : {
      debounceDelay: 2000
    }
  }
};
