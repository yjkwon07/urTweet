const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { findUserWithoutPassword, findUser } = require('../query/user');
const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { SUCCESS, CLIENT_ERROR, USER_ERROR, DEFAULT_SUCCESS_MESSAGE } = require('../constant');

const router = express.Router();

// GET /user (나의 정보 가져오기)
router.get('/', async (req, res, next) => {
  try {
    const user = req.user;
    const myId = parseInt(user?.id, 10);

    if (user) {
      const fullUserWithoutPassword = await findUserWithoutPassword({ id: myId });
      res.status(SUCCESS).send(fullUserWithoutPassword);
    } else {
      res.status(SUCCESS).send(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/followers (내가 팔로우 하는 유저 목록 가져오기)
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    const limit = parseInt(req.query.pageSize, 10) || 10;

    const followers = await user.getFollowers({
      limit,
      attributes: {
        exclude: ['password'],
      },
      joinTableAttributes: [],
    });
    res.status(SUCCESS).send(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/followings (나를 팔로워 하는 유저 목록 가져오기)
router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    const limit = parseInt(req.query.pageSize, 10) || 10;

    const followings = await user.getFollowings({
      limit,
      attributes: {
        exclude: ['password'],
      },
      joinTableAttributes: [],
    });
    res.status(SUCCESS).send(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/:userId (유저정보 조회)
router.get('/:userId', async (req, res, next) => {
  try {
    const UserId = parseInt(req.params.userId, 10);

    const fullUserWithoutPassword = await findUserWithoutPassword({ id: UserId });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(SUCCESS).send(data);
    } else {
      res.status(CLIENT_ERROR).send('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /user (회원가입)
router.post('/', async (req, res, next) => {
  try {
    const email = req.body.email;
    const nickname = req.body.nickname;
    const password = req.body.password;

    const exUser = await findUser({ email });
    if (exUser) {
      return res.status(CLIENT_ERROR).send('이미 사용 중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nickname,
      password: hashedPassword,
    });
    res.status(SUCCESS).send(DEFAULT_SUCCESS_MESSAGE);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /user/login (로그인)
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(USER_ERROR).send(info.reason);
    }
    // req.login()시에 serializeUser 호출
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await findUserWithoutPassword({ id: user.id });
      res.status(SUCCESS).send(fullUserWithoutPassword);
    });
  })(req, res, next); // 미들웨어 확장
});

// POST /user/logout (로그아웃)
router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(SUCCESS).send(DEFAULT_SUCCESS_MESSAGE);
});

// POST /user/nickname (닉네임 수정)
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    const nickname = req.body.nickname;
    const myId = req.user.id;

    await User.update(
      { nickname },
      {
        where: { id: myId },
      },
    );
    res.status(SUCCESS).send({ nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /user/:userId/follow (팔로우)
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const UserId = parseInt(req.params.userId, 10);
    const myId = parseInt(req.user.id, 10);

    const user = await User.findOne({ where: { id: UserId } });
    if (!user) {
      res.status(CLIENT_ERROR).send('존재하지 않는 유저입니다.');
    }
    await user.addFollowers(myId);
    res.status(SUCCESS).send({ UserId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/:userId/follow (팔로우 삭제)
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const UserId = parseInt(req.params.userId, 10);
    const myId = parseInt(req.user.id, 10);

    const user = await User.findOne({ where: { id: UserId } });
    if (!user) {
      res.status(CLIENT_ERROR).send('존재하지 않는 유저입니다.');
    }
    await user.removeFollowers(myId);
    res.status(SUCCESS).send({ UserId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/follower/:userId (팔로워 삭제)
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const UserId = parseInt(req.params.userId, 10);
    const myId = parseInt(req.user.id, 10);

    const user = await User.findOne({ where: { id: UserId } });
    if (!user) {
      res.status(CLIENT_ERROR).send('존재하지 않는 유저입니다.');
    }
    await user.removeFollowings(myId);
    res.status(SUCCESS).send({ UserId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
