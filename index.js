const fs = require('fs');
const getPath = require('./partner').getPath;

module.exports = function(source) {
  this.cacheable();

  const partner = process.env.PARTNER;
  const filePath = this.resourcePath;
  const callback = this.async();

  if (!partner) {
    return callback(null, source);
  }

  getPath(filePath, partner)
    .then((partnerPath) => {
      const isSamePath = partnerPath === filePath;

      if (isSamePath) {
        return callback(null, source);
      }

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