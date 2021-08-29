const { Post, Image, Comment, User, Hashtag } = require('../models');

function findPost(where) {
  return Post.findOne({ where });
}

function findRetweetPost(where) {
  return Post.findOne({
    where,
    include: [
      {
        model: Post,
        as: 'Retweet',
      },
    ],
  });
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
            order: [['createdAt', 'DESC']],
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

function findPostListWithoutUserPassword({ where = {}, limit, offset, hashtag }) {
  return Post.findAll({
    where,
    offset,
    limit,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Hashtag,
        where: hashtag && { name: hashtag },
      },
      {
        model: Image,
      },
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ['id', 'nickname'],
            order: [['createdAt', 'DESC']],
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

module.exports = {
  findPost,
  findRetweetPost,
  findPostWithoutUserPassword,
  findPostListWithoutUserPassword,
};
