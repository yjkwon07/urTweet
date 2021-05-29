const express = require('express');
const { Op } = require('sequelize');

const { findHashtagPostListWithoutUserPassword } = require('../query/post');
const { SUCCESS } = require('../constant');

const router = express.Router();

// GET /hashtag/:hashtag (해쉬태그 검색)
router.get('/:hashtag', async (req, res, next) => {
  try {
    const lastId = parseInt(req.query.lastId, 10);
    const limit = parseInt(req.query.pageSize, 10) || 10;
    const hashtag = decodeURIComponent(req.params.hashtag);

    const where = {};
    if (lastId) {
      where.id = { [Op.lt]: lastId };
    }
    const posts = await findHashtagPostListWithoutUserPassword({ where, limit }, hashtag);
    res.status(SUCCESS).send(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
