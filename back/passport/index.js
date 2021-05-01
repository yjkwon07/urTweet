const passport = require('passport');
const local = require('./local');

const { findUser } = require('../query/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
    // req.session.passport.user 에 저장
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findUser({ id });
      done(null, user); // req.user 전달
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
