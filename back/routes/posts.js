const express = require('express');
const { Op } = require('sequelize');

const { findPostListWithoutUserPassword } = require('../query/post');
const { SUCCESS } = require('../constant');

const router = express.Router();

// GET /posts
router.get('/', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.pageSize, 10) || 10;
    const page = parseInt(req.query.page, 10);
    const hashtag = decodeURIComponent(req.query.hashtag);
    const offset = page === 1 ? 0 : page * limit;

    const where = {};
    if (offset) {
      where.offset = { [Op.lt]: offset };
    }
    const posts = await findPostListWithoutUserPassword({ offset, limit, hashtag });
    res.status(SUCCESS).send(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
