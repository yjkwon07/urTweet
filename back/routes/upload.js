const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3');

const AWS = require('../config/AWS');

const awsUpload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'urtweet',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

const localUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/original/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // ss
      done(null, `${Date.now()}_${basename + ext}`); // ss15184712891.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

module.exports = { upload: process.env.NODE_ENV === 'production' ? awsUpload : localUpload };
