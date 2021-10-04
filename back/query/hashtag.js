const { Hashtag } = require('../models');

function findHashtagList(where) {
  return Hashtag.findAndCountAll({ where, order: [['createdAt', 'DESC']] });
}

module.exports = { findHashtagList };
