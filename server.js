var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 9999;
//var rest_url = "http://54.149.235.181:9000/v3/"
var rest_url = "http://localhost:9000/v3/"
app.use(express.static('.'));
app.use(express.static('./html'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req,res){
	res.redirect('index.html');
});
app.get('/signup', function(req,res){
	res.redirect('signup.html');
});
app.get('/signin', function(req,res){
	res.redirect('signin.html');
});
app.get('/user_profile', function(req,res){
	res.redirect('user_profile.html');
});

app.get('/update_user_profile', function(req,res){
	res.redirect('update_user_profile.html');
});

app.get('/consent_signature', function(req,res){
	res.redirect('consent_signature.html');
});
app.get('/logout', function(req,res){
	res.redirect('signin.html');
});

app.get('/logout', function(req,res){
	res.redirect('signin.html');
});

app.get('/studies', function(req,res){
	var query_string= "format=summary";
	request.get({url:rest_url+'studies', qs:query_string, json:true}, function (e, r, result) {
      res.send(result);
    });
});

app.get('/users/self', function(req,res){
	
	console.log(req.query);
	request.get({url:rest_url+'users/self', headers: {"Bridge-Session":req.headers.sessiontoken},json: req.query}, function (e, r, result) {
      res.statusCode = r.statusCode;
      console.log(JSON.stringify(result))
      res.send(result);
    });
});

app.get('/consents/signature', function(req,res){
	console.log(req.query);
	request.get({url:rest_url+'consents/signature', headers: {"Bridge-Session":req.headers.sessiontoken},json: req.query}, function (e, r, result) {
      res.statusCode = r.statusCode;
      console.log(JSON.stringify(result))
      res.send(result);
    });
});


app.post('/users/self', function(req,res){
	console.log(req.body);
	request.post({url:rest_url+'users/self', headers: {"Bridge-Session":req.headers.sessiontoken} ,json: req.body}, function (e, r, result) {
      res.statusCode = r.statusCode;
      res.send(result);
    });
});

app.post('/auth/resendEmailVerification', function(req,res){
	console.log(req.body);
	request.post({url:rest_url+'auth/resendEmailVerification', headers: {"Bridge-Session":req.headers.sessiontoken} ,json: req.body}, function (e, r, result) {
      res.statusCode = r.statusCode;
      res.send(result);
    });
});

app.post('/auth/signIn', function(req,res){
	request.post({url:rest_url+'auth/signIn', json: req.body}, function (e, r, result) {
      res.statusCode = r.statusCode;
      res.send(result);
    });
});

app.post('/consents/signature', function(req,res){
	console.log(req.body);
	request.post({url:rest_url+'consents/signature', headers: {"Bridge-Session":req.headers.sessiontoken} ,json: req.body}, function (e, r, result) {
      res.statusCode = r.statusCode;
      res.send(result);
    });
});




app.listen(port, function(){
	console.log("App is running on "+ port);
});