const { CLIENT_ERROR } = require('../constant');

const { resErrorDataFormat } = require('../utils/resFormat');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(CLIENT_ERROR).send(resErrorDataFormat(CLIENT_ERROR, '로그인이 필요합니다.'));
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(CLIENT_ERROR).send(resErrorDataFormat(CLIENT_ERROR, '로그인하지 않은 사용자만 접근 가능합니다.'));
  }
};
