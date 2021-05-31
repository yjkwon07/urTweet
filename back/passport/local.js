const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const { findUser } = require('../query/user');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // req.body.email
        passwordField: 'password', // req.body.email`
      },
      async (email, password, done) => {
        try {
          const user = await findUser({ email });
          if (!user) return done(null, false, { reason: '존재하지 않는 이메일입니다!' });
          const result = await bcrypt.compare(password, user.password);
          if (result) return done(null, user);
          return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      },
    ),
  );
};
