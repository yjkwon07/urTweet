const express = require('express');

const { findPostListWithoutUserPassword } = require('../query/post');
const { SUCCESS, CLIENT_ERROR } = require('../constant');
const { resListDataFormat, resErrorDataFormat } = require('../utils/resFormat');

const router = express.Router();

// GET /posts
router.get('/', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.pageSize, 10) || 10;
    const page = parseInt(req.query.page, 10);
    const hashtag = decodeURIComponent(req.query.hashtag);
    const UserId = parseInt(req.params.userId, 10);
    const offset = page === 1 ? 0 : page * limit;

    const where = {};
    if (UserId) where.UserId = UserId;

    const posts = await findPostListWithoutUserPassword({ where, offset, limit, hashtag });
    const list = posts.rows;
    const totalCount = posts.count;
    const totalPage = totalCount / limit;

    const result = {
      list,
      curPage: page,
      nextPage: totalPage > page + 1 ? page + 1 : 0,
      rowsPerPage: limit,
      totalCount,
    };

    if (list.length) {
      res.status(SUCCESS).send(resListDataFormat(SUCCESS, '', result));
    } else {
      res.status(CLIENT_ERROR).send(resErrorDataFormat(CLIENT_ERROR, '조회하신 결과가 없습니다.'));
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
