const { User, Post } = require('../models');

function findUser(where) {
  return User.findOne({ where });
}

function findUserWithoutPassword(where) {
  return User.findOne({
    where,
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: Post,
        attributes: ['id'],
      },
      {
        model: User,
        as: 'Followings',
        attributes: ['id'],
        through: {
          attributes: [],
        },
      },
      {
        model: User,
        as: 'Followers',
        attributes: ['id'],
        through: {
          attributes: [],
        },
      },
    ],
  });
}

module.exports = { findUser, findUserWithoutPassword };
