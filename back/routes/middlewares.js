const { USER_ERROR } = require('../constant');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(USER_ERROR).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(USER_ERROR).send('로그인하지 않은 사용자만 접근 가능합니다.');
  }
};
