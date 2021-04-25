const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');
const { SUCCESS, CLIENT_ERROR, USER_ERROR, DEFAULT_SUCCESS_MESSAGE } = require('../constant');

const router = express.Router();

// GET /user (나의 정보 가져오기)
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      res.status(SUCCESS).send(fullUserWithoutPassword);
    } else {
      res.status(SUCCESS).send(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /user/login (로그인)
router.post('/login', (req, res, next) => {
  // LocalStrategy
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) return res.status(USER_ERROR).send(info.reason);
    // req.login()시에 serializeUser 호출
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      return res.status(SUCCESS).send(fullUserWithoutPassword);
    });
  })(req, res, next); // 미들웨어 확장
});

// POST /user (회원가입)
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
    next(error);
  }
});

// POST /user/logout (로그아웃)
router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(SUCCESS).send(DEFAULT_SUCCESS_MESSAGE);
});

module.exports = router;
