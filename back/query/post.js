const { Post, Image, Comment, User, Hashtag } = require('../models');

function findPost(where) {
  return Post.findOne({ where });
}

function findPostWithoutUserPassword(where) {
  return Post.findOne({
    where,
    include: [
      {
        model: Image,
      },
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ['id', 'nickname'],
          },
        ],
      },
      {
        model: User,
        attributes: ['id', 'nickname'],
      },
      {
        model: User,
        as: 'Likers',
        attributes: ['id'],
        through: {
          attributes: [],
        },
      },
    ],
  });
}

module.exports = { findPost, findPostWithoutUserPassword };
