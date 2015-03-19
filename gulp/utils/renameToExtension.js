var rename        = require('gulp-rename');

function extensionRenameFilter(toExt) {
  return rename(function(pathObj) {

    pathObj.basename = pathObj.basename.replace(/\..*$/, '');
    pathObj.extname = toExt;

    return pathObj;
  });
}

module.exports = extensionRenameFilter;
