const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    port: 3065,
  },
  test: {
    port: 3065,
  },
  production: {
    port: 3065,
    origin: 'https://urtweet.shop',
    domain: '.urtweet.shop',
  },
};