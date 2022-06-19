const express = require('express'); // express 모듈 설치
const app = express();
const path = require('path'); // html 파일 경로 지정을 위한 path 모듈 설치
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// * 환경 변수 설정으로 포트번호 변수화
// * process.env 객체에 PORT 속성이 있다면 그 값을 사용하고 없다면 기본값으로 3000번 포트 이용.
app.set('port', process.env.PORT || 3000);

// * 미들웨어 사용하기
app.use(morgan('combined'));
app.use(cookieParser());
// 요청 body 내용을 받아오기 위해 자주 쓰이는 조합
app.use(express.json()); // 클라이언트에서 받아온 JSON 데이터를 파싱
app.use(express.urlencoded({ extended: true })); // form 데이터를 파싱
// true면 qs모듈 사용, false면 querystring 내장모듈 사용

// app.use(
//   (req, res, next) => {
//     console.log('모든 요청에 다 실행될 코드 1');
//     next(); // 매개변수에 next가 있어야 하고 이를 호출해야 다음 메소드로 넘어갈 수 있음!!
//   },
//   (req, res, next) => {
//     console.log('모든 요청에 다 실행될 코드 2');
//     next(); // 매개변수에 next가 있어야 하고 이를 호출해야 다음 메소드로 넘어갈 수 있음!!
//   }
// );

// * 라우터 (경로, 미들웨어)
app.get('/', (req, res) => {
  req.cookies; // 알아서 쿠키를 파싱해줌. cookieParser 미들웨어 사용
  // Set-Cookie
  res.cookie('name', encodeURIComponent(name), {
    expires: new Date(),
    httpOnly: true,
    path: '/',
  });
  res.sendFile(path.join(__dirname, './index.html')); // get 요청의 응답으로 html 파일 전송
});

app.post('/', (req, res) => {
  res.send('post 요청 메서드');
});

app.get('/category/express', (req, res) => {
  res.send('현재 카테고리는 express 입니다.');
});

// * req.params(와일드카드 라우팅)
// 와일드카드 라우팅 시 라우터 가장 아래쪽에 위치해야 위 라우터들의 경로가 무시되지 않는다.
app.get('/category/:name', (req, res) => {
  res.send(`현재 카테고리는 ${req.params.name} 입니다.`);
});

// // * 모든 경로에 대응하는 미들웨어
// // 이 또한 가장 아래쪽에 위치해야 위 라우터들의 경로가 무시되지 않는다.
// app.get('*', (req, res) => {
//   res.send('모든 경로에 대응');
// });

// * 에러 처리 미들웨어 직접 만들기 - 1. 상태 코드 404 숨기기
app.use((req, res, next) => {
  res.send('404일까요~ 아닐까요~ 안알랴줌'); // res.status(200).send(...) 과 같은 말이다.
});

// * 에러 처리 미들웨어 직접 만들기 - 2. 404 외 에러 상태코드 숨기기
// * 매개변수를 반드시 4개 사용할 것!
app.use((err, req, res, next) => {
  console.error(err);
  res.status(403).send('에러 상태코드 숨기기');
  // 응답할 상태코드 번호는 숨기고 싶은 에러 상태 코드에 따라 지정하면 된다.
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 대기 중`);
});
