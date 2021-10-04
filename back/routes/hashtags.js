const express = require('express');
const { Op } = require('sequelize');

const { findHashtagList } = require('../query/hashtag');
const { SUCCESS, CLIENT_ERROR } = require('../constant');
const { resListDataFormat, resErrorDataFormat } = require('../utils/resFormat');

const router = express.Router();

// GET /hashtags
router.get('/', async (req, res, next) => {
  try {
    const keyword = decodeURIComponent(req.query.keyword);

    const where = {};
    if (keyword) {
      where.name = {
        [Op.like]: `%${keyword}%`,
      };
    }

    const hashtags = await findHashtagList(where);
    const list = hashtags.rows;
    const totalCount = hashtags.count;

    const result = {
      list,
      curPage: 1,
      nextPage: 0,
      rowsPerPage: totalCount,
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
