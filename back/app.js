const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');

// config & init
dotenv.config();
db.sequelize.sync().catch(console.error);
const app = express();
passportConfig();

// Global
app.use(morgan('dev'));
app.use(
  cors({
    origin: true, // *, true, "front-server"
    credentials: true, // Access-Allow-Credential = true => 쿠키 전달
  }),
);
app.use(express.json()); // json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  }),
);
app.use(passport.initialize()); // passport 설정 초기화
app.use(passport.session()); // express session이 session을 만들고 난 후, passport가 session을 사용하여 사용자 정보를 저장한다.
// End-Global

// Router`
app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
// End-Router

app.listen(3065, () => {
  console.log('server start...');
});
