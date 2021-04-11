const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const db = require('./models');
const userRouter = require('./routes/user');
const passportConfig = require('./passport');

// config & init
dotenv.config();
const app = express();
passportConfig();

// DB
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
// End-DB

// Global
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json()); // json
app.use(express.urlencoded({ extended: true })); // FormData
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
// End-Global

// Router
app.use('/user', userRouter);
// End-Router

app.listen(3065, () => {
  console.log('서버 실행 중!');
});
