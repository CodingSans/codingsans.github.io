var map = require('map-stream');

function removeSourceMap() {

  return map(function(file, done) {
    if (file.isNull()) { return done(null, file); }
    if (file.isStream()) { throw new Error('no support'); }

    var content = file.contents.toString();

    var pos = content.indexOf('//# sourceMappingURL=data:application/json;base64,');
    if (pos === -1) {
      pos = content.indexOf('//@ sourceMappingURL=data:application/json;base64,');
    }

    if (pos !== -1) {
      content = content.substr(0, pos);
    }

    file = file.clone();
    file.contents = new Buffer(content);
    delete file.sourceMap;

    return done(null, file);
  });

}

module.exports = removeSourceMap;
