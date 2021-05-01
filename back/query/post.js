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
      {
        model: Post,
        as: 'Retweet',
        include: [
          {
            model: User,
            attributes: ['id', 'nickname'],
          },
          {
            model: Image,
          },
        ],
      },
    ],
  });
}

function findPostListWithoutUserPassword(config) {
  return Post.findAll({
    order: [
      ['createdAt', 'DESC'],
      [Comment, 'createdAt', 'DESC'],
    ],
    ...config,
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
      {
        model: Post,
        as: 'Retweet',
        include: [
          {
            model: User,
            attributes: ['id', 'nickname'],
          },
          {
            model: Image,
          },
        ],
      },
    ],
  });
}

module.exports = { findPost, findPostWithoutUserPassword, findPostListWithoutUserPassword };
