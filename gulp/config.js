var dest = "./";
var src = './src/';

module.exports = {
  browserSync: {
    server: {
      baseDir: "./"
    },
    port : 8080,
    injectChanges: true,
  },
  less: {
    src: src + 'less/*.less',
    dest: dest + '/css/',
    settings : {
      paths: [ src + '/less/includes' ],
      plugins : [new (require("less-plugin-clean-css"))({advanced: true})]
    },
  },
  ejs: {
    src: src + '/templates/**/*.ejs',
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      name : 'bundle.js',
      dest : dest + '/js/',
      entries: [src + '/js/bundle.js'], // Only need initial file, browserify finds the deps
      basedir: __dirname + '/..',
      debug: true, // Gives us sourcemapping
      cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    }],
    
    productConfigs : [{
      name : 'bundle.js',
      dest : dest + '/js/',
      entries: [src + '/js/bundle.js'], // Only need initial file, browserify finds the deps
      basedir: __dirname + '/..'
    }]
  }
};