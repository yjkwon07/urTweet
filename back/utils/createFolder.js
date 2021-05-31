const fs = require('fs');

const createUploadFolder = (name) => {
  try {
    fs.accessSync(name);
  } catch (error) {
    console.log('uploads folder create');
    fs.mkdirSync(name);
  }
};

module.exports = createUploadFolder;
