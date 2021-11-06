const express = require('express');
const { Op } = require('sequelize');

const { findHashtagList } = require('../query/hashtag');
const { SUCCESS } = require('../constant');
const { resListDataFormat } = require('../utils/resFormat');

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

    res.status(SUCCESS).send(resListDataFormat(SUCCESS, '', result));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
