const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const path = require('path');

const db = require('./models');
const passportConfig = require('./passport');
const fileRouter = require('./routes/file');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');

// config & init
dotenv.config();
const env = process.env.NODE_ENV || 'development';
const config = require('./config/global')[env];

db.sequelize.sync().catch(console.error);
const app = express();
passportConfig();
// End-config & init

// Global
if (env === 'production') {
  app.enable('trust proxy');
  app.use(morgan('combined')); // 요청 http logger
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: config.origin, // *, true, "front-server", 요청 http 허용 [], "", true(all)
      credentials: true, // Access-Allow-Credential = true => 쿠키 전달, flalse일 경우 응답 헤더가 리소스와 함께 반환되지 않습니다. 이 헤더가 없으면 브라우저에서 응답을 무시하고 웹 컨텐츠로 반환되지 않는다는 점을 주의하세요.
    }),
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
}
app.use('/', express.static(path.join(__dirname, 'uploads'))); // static 폴더 지정을 하여 데이터 불러오기
app.use(express.json()); // json parsing (axios에서 데이터를 보낼때)
app.use(express.urlencoded({ extended: true })); // 일반 data Form 데이터 parsing
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 parsing secret 코드 넣게 되면 signed cookie 검사
app.use(
  session({
    proxy: process.env.NODE_ENV === 'production', // 프록시 허용
    saveUninitialized: false, // 요청이 왔을 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정
    resave: false, // 세션에 저장할 내역이 없더라도 세션을 저장할지 대한 설정 (보통 방문자를 추적할 때 사용된다.)
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: env === 'production',
      domain: env === 'production' && config.domain,
    },
  }),
);
app.use(passport.initialize()); // passport 설정 초기화
app.use(passport.session()); // express session이 session을 만들고 난 후, passport가 session을 사용하여 사용자 정보를 저장한다.
// End-Global

// Router
app.use('/file', fileRouter);
app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
// End-Router

app.listen(config.port, () => {
  console.log('server start...');
});
