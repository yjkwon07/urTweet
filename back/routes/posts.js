const express = require('express');
const { Op } = require('sequelize');

const { findPostListWithoutUserPassword } = require('../query/post');
const { SUCCESS } = require('../constant');

const router = express.Router();

// GET /posts
router.get('/', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.pageSize, 10) || 10;
    const lastId = parseInt(req.query.lastId, 10);

    const where = {};
    if (lastId) {
      where.id = { [Op.lt]: lastId };
    }
    const posts = await findPostListWithoutUserPassword({ where, limit });
    res.status(SUCCESS).send(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
