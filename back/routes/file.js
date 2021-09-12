const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { upload } = require('./upload');

const router = express.Router();

// POST /file/upload (이미지 업로드)
router.post('/upload', isLoggedIn, upload.array('image'), (req, res, next) => {
  res.send(req.files.map((v) => v.location.replace(/\/original\//, '/thumb/')));
});

module.exports = router;
