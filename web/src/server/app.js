/** 노드 실행시에 앞에 supervisor 키워드를 붙여서 실행하면 백그라운드
*   에서 supervisor가 app.js가 바뀌는 것을 감지해서
*   실시간으로 웹페이지에 반영
*	ex) supervisor node app.js */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;				//웹의 html 코드가 이쁘게 출력되게 하는 코드.
app.set('view engine', 'pug');			//pug, (구)jade 를 쓰기 위한 세팅
app.set('views', './views');			//위와 마찬가지. 파일을 views 폴더안에 넣음.

app.use(express.static('public'));		//정적인 파일을 쓰고 싶을때, 해당 파일이
										//있는 폴더 지정. <정적인 파일은 변경된 내용이 바로 반영됨>
app.use(bodyParser.urlencoded({ extended: false }));	// bodyparser 가 미들웨어로써
					     								// 중간에서 post 형식의 요청 처리.
app.get('/form', function(req, res){    // form.pug load
    res.render('form');
});
/** GET
 * 홈페이지로 부터 요청한 데이터를 받아올 때,
 * url에 전송하는 데이터를 표시되게 할 때,
 * 전송하려는 데이터가 유실되어도 상관없을 때.
 */
app.get('/form_receiver', function(req, res){   // get 방식 사용시, url에 모든 정보가 드러남.
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+', '+description);
});
/** POST
 * url에 전송하는 데이터를 표시하지 않을 때,
 * 전송하려는 데이터가 유실되지 않게 할 때.
 * express나 koa에서 제공되지 않기 때문에 body-parser 사용.
 */
app.post('/form_receiver', (req,res) => {		// post 방식에서 req에 원래 존재하지 않았던 body 객체를
												// body-parser가 추가해서 사용 가능.
	var title = req.body.title;
	var description = req.body.description;
	res.send(title + ', ' + description);
});
app.get('/topic/:id', (req, res) => {	//query가 '?id=' 형태로 들어올 때. ':id'를 이용하면 시맨틱 url로 표시됨
	var topics = [
		'Javascript is....',
		'Nodejs is...',
		'Express is...'
	];
	var output = `
	<a href="/topic/0">Javascript</a><br><br>
	<a href="/topic/1">Nodejs</a><br><br>
	<a href="/topic/2">Express</a><br><br>
	${topics[req.params.id]}  		
	`;
	//만약 semantic url로 정보가 들어오면 query부분을 params로 바꿔주면 됨.
	res.send(output);
	//res.send('id : ' + req.query.id + ', name : ' + req.query.name);		//query에 id, name이 있을 때 ex)?id=1&name=01
});

app.get('/topic/:id/:mode', function(req, res){
	res.send(req.params.id + ' , ' + req.params.mode);
});

app.get('/template', function(req, res){	//views 디렉토리안에 있는 temp.jade파일 렌더링
	res.render('temp', {time: Date(), _title: 'Pug예제'});	//두번째 인자에 객체를 넣음. temp라는 템플릿 파일을 웹페이지에서 렌더링해서 보여줌.
});

app.get('/', function(req, res){		//localhost:3000 에 접속했을 때 보이는 텍스트
	res.send('Hello home page<br>' +
		'<a href="travel">click to visit other pages</a>') ;
});
app.get('/mac', function(req,res){		//localhost:3000/mac
	res.send('Mac image -> <img src="/mac.png">');				//mac image가 정적폴더 안에 있기 때문에 바로 접근 가능
});
app.get('/login', function(req, res){	//localhost:3000/login
	res.send('<h1>Login please</h1>');
});
app.get('/travel', function(req,res){
	res.send(
		'<a href="login">login page(simple)</a><br>' +
        '<a href="mac">mac page(test static)</a><br>' +
		'<a href="dynamic">dynamic page(test dynamic)</a><br>' +
		'<a href="template">template page(test pug)</a><br>' +
        '<a href="topic">topic page(test queryString)</a><br>' +
		'<a href="/mini_web_project/mainpage.html">my web project(using static page)</a><br>');
});
app.get('/dynamic', function(req, res){			//dynamic 웹페이지 사용 방법.
	var lis = '';
	for(var i=0; i<5; i++){
		lis = lis + '<li>coding ' + i + '</li>';
	}
	var time = Date();
	var output = `
	<!Doctype html>
	<html>
		<head>
			<meta charset = "utf-8">
			<title>Dynamic page</title>
		<head>
		<body style="background: black; color: white;">
			<h2><middle>Hello, Dynamic!</middle></h2>
			<ul>
			${lis}
			</ul>
			${time}
		</body>
	</html>`;
	res.send(output);
});
app.listen(3000, function(){			//3000포트 접속에 대해 대기하는 것.
	console.log('Connected 3000 port!');
});
