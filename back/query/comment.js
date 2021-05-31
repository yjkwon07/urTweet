const { Comment, User } = require('../models');

function findComment(where) {
  return Comment.findOne({ where });
}

function findCommentWithoutUserPassword(where) {
  return Comment.findOne({
    where,
    include: [
      {
        model: User,
        attributes: ['id', 'nickname'],
      },
    ],
  });
}

module.exports = { findComment, findCommentWithoutUserPassword };
