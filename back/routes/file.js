const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { awsUpload: upload } = require('./upload');

const router = express.Router();

// POST /file/images (이미지 업로드)
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  res.send(req.files.map((v) => v.location.replace(/\/original\//, '/thumb/')));
});

module.exports = router;
