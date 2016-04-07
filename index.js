const fs = require('fs');
const getPath = require('./partner').getPath;

module.exports = function(source) {
  this.cacheable();

  const partner = process.env.PARTNER;
  const filePath = this.resourcePath;
  const callback = this.async();

  if (!partner) {
    return source;
  }

  getPath(filePath, partner)
    .then((partnerPath) => {
      fs.readFile(partnerPath, (err, fileStream) => {
        if (err) {
          return callback(err);
        }
        const fileSource = fileStream.toString();
        return callback(null, fileSource);
      });
    }).catch((err) => {
      return callback(err);
    });
};