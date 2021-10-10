const express = require('express');
const { SUCCESS } = require('../constant');

const { isLoggedIn } = require('./middlewares');
const { upload } = require('./upload');
const { resDataFormat } = require('../utils/resFormat');

const router = express.Router();

// POST /file/upload (파일 업로드)
router.post('/upload', isLoggedIn, upload.array('file'), (req, res, next) => {
  let resData = [];

  if (process.env.NODE_ENV === 'production') {
    resData = req.files.map((v) => v.location.replace(/\/original\//, '/thumb/'));
  } else {
    resData = req.files.map((v) => v.filename);
  }

  res.status(SUCCESS).send(resDataFormat(SUCCESS, '', resData));
});

module.exports = router;
