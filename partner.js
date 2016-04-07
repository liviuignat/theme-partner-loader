const fs = require('fs');

module.exports = {
  getPath,
  getPathSync
};

function getPath(filePath, partner) {
  if (!partner) {
    return filePath;
  }

  const regex = /^(.+)\/([a-zA-Z-_]+.\w+)$/;
  const match = filePath.match(regex);
  if (match) {
    const fileName = match[2];
    const dir = match[1];
  }

  return new Promise((resolve, reject) => {
    const partnerPath = `${dir}/partners/${partner}/${fileName}`;
    fs.exists(partnerPath, (exists) => {
      if (!exists) {
        return resolve(filePath);
      }
      return resolve(partnerPath);
    });
  });
}

function getPathSync(filePath, partner) {
  if (!partner) {
    return filePath;
  }

  const regex = /^(.+)\/([a-zA-Z-_]+.\w+)$/;
  const match = filePath.match(regex);
  if (match) {
    const fileName = match[2];
    const dir = match[1];
  }

  const partnerPath = `${dir}/partners/${partner}/${fileName}`;
  const exists = fs.existsSync(partnerPath);

  if (!exists) {
    return filePath;
  }
  return partnerPath;
}