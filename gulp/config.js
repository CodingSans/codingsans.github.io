
var dest = './';
var src = './src/';

module.exports = {
  browserSync : {
    server : {
      baseDir : './'
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
    src : src + 'stylesheets/**/*.css.scss',
    dest : dest + '/assets/',
    watch : src + 'stylesheets/**/*.{css,scss,sass}',
  },
  scripts : {
    src : [src + 'scripts/**/*.js.glob'],
    dest : dest + '/assets/',
    watch : src + 'scripts/**/*.js.glob',
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
    files : ['**/*.{html}', 'assets/**/*', '!node_modules/**/*', '!src/**/*', '!gulp/**/*'],
  },
  watch : {
    options : {
      debounceDelay: 2000
    }
  }
};
