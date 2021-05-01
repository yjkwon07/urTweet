const express = require('express');
const { Op } = require('sequelize');

const { findPostListWithoutUserPassword } = require('../query/post');
const { SUCCESS } = require('../constant');

const router = express.Router();

// GET /posts
router.get('/', async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await findPostListWithoutUserPassword({
      where,
      limit: parseInt(req.query.pageSize, 10) || 10,
    });
    res.status(SUCCESS).send(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
