const express = require('express');
const bcrypt = require('bcrypt');

const { User } = require('../models');
const { SUCCESS, CLIENT_ERROR, DEFAULT_SUCCESS_MESSAGE } = require('../constant');
const router = express.Router();

// POST /user/ (회원가입)
router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) return res.status(CLIENT_ERROR).send('이미 사용 중인 아이디입니다.');
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(SUCCESS).send(DEFAULT_SUCCESS_MESSAGE);
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

module.exports = router;
