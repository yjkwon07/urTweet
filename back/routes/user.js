const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { findUserWithoutPassword, findUser } = require('../query/user');
const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { SUCCESS, CLIENT_ERROR, INFO_EMPTY_ERROR } = require('../constant');
const { resErrorDataFormat, resDataFormat, resListDataFormat, resItemDataFormat } = require('../utils/resFormat');

const router = express.Router();

// GET /user (나의 정보 가져오기)
router.get('/', async (req, res, next) => {
  try {
    const myId = parseInt(req.user.id, 10);

    if (myId) {
      const fullUserWithoutPassword = await findUserWithoutPassword({ id: myId });
      res.status(SUCCESS).send(resItemDataFormat(SUCCESS, '', fullUserWithoutPassword));
    } else {
      return res.status(INFO_EMPTY_ERROR).send(resErrorDataFormat(INFO_EMPTY_ERROR, '존재하지 않는 사용자입니다.'));
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /user (나의 정보 수정)
router.patch('/', isLoggedIn, async (req, res, next) => {
  try {
    const email = req.body.email;
    const nickname = req.body.nickname;
    const myId = parseInt(req.user.id, 10);

    await User.update(
      { email, nickname },
      {
        where: { id: myId },
      },
    );

    res.status(SUCCESS).send(resDataFormat(SUCCESS, '수정 완료', { email, nickname }));
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
    const page = parseInt(req.query.page, 10);
    const offset = page === 1 ? 0 : (page - 1) * limit;

    const followers = await user.getFollowers({
      offset,
      limit,
      attributes: {
        exclude: ['password'],
      },
      joinTableAttributes: [],
    });
    const totalCount = await user.countFollowers();
    const list = followers;
    const totalPage = Math.ceil(totalCount / limit);

    const result = {
      list,
      curPage: page,
      nextPage: totalPage > page ? page + 1 : 0,
      rowsPerPage: limit,
      totalCount,
    };

    res.status(SUCCESS).send(resListDataFormat(SUCCESS, '', result));
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
    const page = parseInt(req.query.page, 10);
    const offset = page === 1 ? 0 : (page - 1) * limit;

    const followings = await user.getFollowings({
      offset,
      limit,
      attributes: {
        exclude: ['password'],
      },
      joinTableAttributes: [],
    });
    const totalCount = await user.countFollowings();
    const list = followings;
    const totalPage = Math.ceil(totalCount / limit);

    const result = {
      list,
      curPage: page,
      nextPage: totalPage > page ? page + 1 : 0,
      rowsPerPage: limit,
      totalCount,
    };

    res.status(SUCCESS).send(resListDataFormat(SUCCESS, '', result));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/:userId (유저정보 조회)
router.get('/:userId', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const fullUserWithoutPassword = await findUserWithoutPassword({ id: userId });

    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(SUCCESS).send(resItemDataFormat(SUCCESS, '', data));
    } else {
      return res.status(INFO_EMPTY_ERROR).send(resErrorDataFormat(INFO_EMPTY_ERROR, '존재하지 않는 사용자입니다.'));
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
      return res.status(CLIENT_ERROR).send(resErrorDataFormat(CLIENT_ERROR, '이미 사용 중인 아이디입니다.'));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      nickname,
      password: hashedPassword,
    });
    const fullUserWithoutPassword = await findUserWithoutPassword({ id: user.id });

    res.status(SUCCESS).send(resDataFormat(SUCCESS, '등록완료', fullUserWithoutPassword));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /user/login (로그인)
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info) {
      return res.status(CLIENT_ERROR).send(resErrorDataFormat(CLIENT_ERROR, info.reason));
    }
    // req.login()시에 serializeUser 호출
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      const fullUserWithoutPassword = await findUserWithoutPassword({ id: user.id });

      res.status(SUCCESS).send(resDataFormat(SUCCESS, '로그인 완료', fullUserWithoutPassword));
    });
  })(req, res, next); // 미들웨어 확장
});

// POST /user/logout (로그아웃)
router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(SUCCESS).send(resDataFormat(SUCCESS, '로그아웃 완료', null));
});

// PATCH /user/follow/:userId (팔로우)
router.patch('/follow/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const myId = parseInt(req.user.id, 10);
    const userId = parseInt(req.params.userId, 10);

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(INFO_EMPTY_ERROR).send(resErrorDataFormat(INFO_EMPTY_ERROR, '존재하지 않는 사용자입니다.'));
    }
    await user.addFollowers(myId);

    res.status(SUCCESS).send(resDataFormat(SUCCESS, '팔로우 완료', { userId }));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/follow/:userId (팔로우 삭제)
router.delete('/follow/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const myId = parseInt(req.user.id, 10);
    const userId = parseInt(req.params.userId, 10);

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(INFO_EMPTY_ERROR).send(resErrorDataFormat(INFO_EMPTY_ERROR, '존재하지 않는 사용자입니다.'));
    }
    await user.removeFollowers(myId);

    res.status(SUCCESS).send(resDataFormat(SUCCESS, '팔로우 삭제 완료', { userId }));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/follower/:userId (팔로워 삭제)
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const myId = parseInt(req.user.id, 10);
    const userId = parseInt(req.params.userId, 10);

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(INFO_EMPTY_ERROR).send(resErrorDataFormat(INFO_EMPTY_ERROR, '존재하지 않는 사용자입니다.'));
    }
    await user.removeFollowings(myId);

    res.status(SUCCESS).send(resDataFormat(SUCCESS, '팔로워 삭제 완료', { userId }));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
