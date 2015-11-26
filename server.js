var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8888;

var rest_url = "http://54.149.235.181:9000/v3/"

//var rest_url = "http://localhost:9000/v3/"
//var rest_url = "http://172.30.252.231:9000/v3/"
app.use(express.static('.'));
app.use(express.static('./html'));
app.use(express.static('./researcher'));


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

app.get('/survey_details', function(req,res){
	res.redirect('surveys.html');
});

app.get('/consent_signature', function(req,res){
	res.redirect('consent_signature.html');
});

app.get('/study', function(req,res){
	res.redirect('studies.html');
});

app.get('/study_consent', function(req,res){
	res.redirect('study_consent.html');
});

app.get('/create_user', function(req,res){
	res.redirect('create_user.html');
});

app.get('/delete_user', function(req,res){
	res.redirect('delete_user.html');
});

app.get('/logout', function(req,res){
	res.redirect('signin.html');
});


// Authentication

app.post('/auth/signUp', function(req,res){
	console.log(req.body);
	request.post({url:rest_url+'auth/signUp', json: req.body}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.post('/auth/signIn', function(req,res){
	console.log(req.body);
	request.post({url:rest_url+'auth/signIn', json: req.body}, function (e, r, result) {
		console.log(result);
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.post('/auth/verifyEmail', function(req,res){
	console.log('requested for - /auth/verifyEmail');
	var re =   { 
		"study":"doapi",
		"sptoken":"4S7QavNTXV5royUaYQgpVn"
	}
	request.post({url:rest_url+'auth/verifyEmail', json: req.body}, function (e, r, result) {
		console.log(result);
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.post('/auth/resendEmailVerification', function(req,res){
	console.log(req.body);
	var re = { 
		"study":"doapi",
		"email":"saibabanadh@gmail.com"
	}
	request.post({url:rest_url+'auth/resendEmailVerification', headers: {"Bridge-Session":req.headers.sessiontoken} ,json: req.body}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.get('/auth/signOut', function(req,res){
	console.log(' requested for - /auth/signOut');
	res.redirect('signin.html');
});



// User Profile

app.get('/users/self', function(req,res){

	console.log(req.query);
	request.get({url:rest_url+'users/self', headers: {"Bridge-Session":req.headers.sessiontoken},json: req.query}, function (e, r, result) {
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


// User Data

app.post('/users/self/emailData', function(req,res){
	console.log('requwsted for - /users/self/emailData');
});


// Consent API

app.post('/consents/signature', function(req,res){
	console.log(req.body);
	request.post({url:rest_url+'consents/signature', headers: {"Bridge-Session":req.headers.sessiontoken} ,json: req.body}, function (e, r, result) {
		res.statusCode = r.statusCode;
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

app.post('/users/self/dataSharing', function(req,res){
	console.log(req.body);
	console.log("requested for - '/users/self/dataSharing'");

});

app.post('/consents/signature/email', function(req,res){
	console.log(req.body);
	console.log("requested for - '/consents/signature/email'");

});

// Studies

app.get('/studies', function(req,res){
	request.get({url:rest_url+'studies?format=summary', json:true}, function (e, r, result) {
		res.send(result);
	});
});

app.post('/studies', function(req,res){
	console.log(req.body);
	request.post({url:rest_url+'studies', headers: {"Bridge-Session":req.headers.sessiontoken} ,json: req.body}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.get('/studies/self', function(req,res){
	console.log(req.query);
	request.get({url:rest_url+'studies/doapi', headers: {"Bridge-Session":req.headers.sessiontoken},json: req.query}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});


// Study Consent

app.get('/consents', function(req,res){
	request.get({url:rest_url+'consents', headers: {"Bridge-Session":req.headers.sessiontoken},json: req.query}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.post('/consents', function(req,res){
	console.log(req.body);
	request.post({url:rest_url+'consents', headers: {"Bridge-Session":req.headers.sessiontoken} ,json: req.body}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.get('/consents/published', function(req,res){
	request.get({url:rest_url+'consents/published', headers: {"Bridge-Session":req.headers.sessiontoken},json: req.query}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});


// Surveys
// List most recent versions of all surveys
// List published versions of all surveys
// Create a new survey
// Get a survey version
// Get the most recent version of a survey
// Get the most recently published version of a survey 
// Create a new version of a survey
// Update an existing survey
// Publish a survey
// Delete a survey

app.get('/surveys', function(req,res){
	console.log("Get Surveys");
	request.get({url:rest_url+'surveys', headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.get('/surveys/published', function(req,res){
	console.log("Get Surveys published");
	request.get({url:rest_url+'surveys/published', headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.post('/surveys', function(req,res){
	console.log("Post Surveys");
	request.post({url:rest_url+'surveys', headers: {"Bridge-Session":req.headers.sessiontoken},json: req.body }, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.get('/surveys/:surveyGuid/revisions/:created', function(req,res){
	console.log(req.params.surveyGuid + " : " + req.params.created);
	console.log('requested for - ' + '/surveys/:surveyGuid/revisions/:created');
	request.get({url:rest_url+'/surveys/'+req.params.surveyGuid+'/revisions/'+req.params.created, headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.get('/surveys/:surveyGuid/revisions/recent', function(req,res){
	console.log('requested for - ' + '/surveys/:surveyGuid/revisions/recent');
	request.get({url:rest_url+'/surveys/'+req.params.surveyGuid+'/revisions/recent', headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.get('/surveys/:surveyGuid/revisions/published', function(req,res){
	console.log('requested for - ' + '/surveys/:surveyGuid/revisions/published');
	request.get({url:rest_url+'/surveys/'+req.params.surveyGuid+'/revisions/published', headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.get('/surveys/:identifier', function(req,res){
	console.log('requested for - ' + '/surveys/:identifier');
	request.get({url:rest_url+'surveys/'+req.params.identifier, headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.get('/surveys/:surveyGuid/revisions', function(req,res){
	console.log('requested for - ' + '/surveys/:surveyGuid/revisions');
	request.get({url:rest_url+'/surveys/'+req.params.surveyGuid+'/revisions', headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.post('/surveys/:surveyGuid/revisions/:createdOn/version', function(req,res){
	console.log(req.body);
	console.log('requested for POST - ' + '/surveys/:surveyGuid/revisions/:createdOn/version');
	request.post({url:rest_url+'surveys/'+req.params.surveyGuid+'/revisions/'+req.params.createdOn+'/version', headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.post('/surveys/:surveyGuid/revisions/:createdOn', function(req,res){
	console.log(req.body);
	console.log('requested for POST- ' + '/surveys/:surveyGuid/revisions/:createdOn');
	request.post({url:rest_url+'surveys/'+req.params.surveyGuid+'/revisions/'+req.params.createdOn, headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.post('/surveys/:surveyGuid/revisions/:createdOn/publish', function(req,res){
	console.log('requested for POST- ' + '/surveys/:surveyGuid/revisions/:createdOn/publish');
	request.post({url:rest_url+'surveys/'+req.params.surveyGuid+'/revisions/'+req.params.createdOn+'/publish', headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.delete('/surveys/:surveyGuid/:createdOn', function(req,res){
	console.log('requested for delete- ' + '/surveys/:surveyGuid/:createdOn');
	request.del({url:rest_url+'surveys/'+req.params.surveyGuid+'/'+req.params.createdOn, headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});

});


// Schedule Planning
// Get list of schedule plans
// Create a schedule plan
// Get a schedule plan
// Update a schedule plan
// Delete a schedule plan

app.get('/scheduleplans',function(req,res){
	console.log('requested for- /scheduleplans');
	request.get({url:rest_url+'scheduleplans', headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.post('/scheduleplans',function(req,res){
	console.log(req.body);
	console.log('post requested for- /scheduleplans');
	request.post({url:rest_url+'scheduleplans', headers: {"Bridge-Session":req.headers.sessiontoken},json: req.body }, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.get('/scheduleplans/:guid',function(req,res){
	console.log('requested for- /scheduleplans/:guid');
	request.get({url:rest_url+'scheduleplans/'+req.params.guid, headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.post('/scheduleplans/:guid',function(req,res){
	console.log(req.body);
	console.log(' post request for- /scheduleplans/:guid');
	request.post({url:rest_url+'scheduleplans/'+req.params.guid, headers: {"Bridge-Session":req.headers.sessiontoken},json: req.body }, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.delete('/scheduleplans/:guid',function(req,res){
	console.log('delete request for- /scheduleplans/:guid');
	request.del({url:rest_url+'scheduleplans/'+req.params.guid, headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});


// Tasks
// Get schedules for user
// Get all tasks
// Update Tasks

app.get('/schedules', function(req,res){
	console.log('Requested for - /schedules');
	request.get({url:rest_url+'schedules', headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.get('/tasks', function(req,res){
	console.log('Requested for - /tasks');
	request.get({url:rest_url+'tasks', headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.post('/tasks', function(req,res){
	console.log('Requested for - /tasks');
	request.post({url:rest_url+'tasks', headers: {"Bridge-Session":req.headers.sessiontoken},json: req.body }, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

//// Pre-signed File Upload
// Request a upload session
// Start upload using the pre-signed URL
// Upload complete
// Upload status


app.post('/uploads', function(req,res){
	console.log('Requested for - /uploads');
	console.log(req.body);
	request.post({url:rest_url+'uploads', headers: {"Bridge-Session":req.headers.sessiontoken},json: req.body }, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});
app.post('/uploads/:id/complete', function(req,res){
	console.log('Requested for - /uploads/:id/complete');
	request.post({url:rest_url+'uploads/'+req.query.id+'/complete', headers: {"Bridge-Session":req.headers.sessiontoken},json: req.body }, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});
app.get('/uploadstatuses/:id', function(req,res){
	console.log('Requested for - /uploadstatuses/:id');
	request.get({url:rest_url+'uploadstatuses/'+req.query.id, headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

// Upload Schemas
// Get all schemas for study
// Get all schema revisions
// Get most recent revision of schema
// Get a specific revision of a schema
// Create or update schema
// Delete a schema and all its revisions
// Delete a specific revision of a schema

app.get('/uploadschemas', function(req,res){
	request.get({url:rest_url+'uploadstatuses/'+req.query.id, headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});





// Admin 

app.post('/users', function(req,res){
	console.log(req.body);
	request.post({url:rest_url+'users', headers: {"Bridge-Session":req.headers.sessiontoken} ,json: req.body}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});

app.delete('/users', function(req,res){
	console.log(req.body.email);
	request.del({url:rest_url+'users?email='+req.body.email, headers: {"Bridge-Session":req.headers.sessiontoken} }, function (e, r, result) {
		res.statusCode = r.statusCode;
		console.log(JSON.stringify(result))
		res.send(result);
	});
});


// Researchers

app.get('/researcher/dashboard', function(req,res){
	res.redirect('/researcher/dashboard.html');
});

app.get('/researcher/surveys', function(req,res){
	console.log("/researcher/surveys");
	request.get({url:rest_url+'surveys', headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		console.log(result);
		res.send(result);
	});
});

app.get('/researcher/scheduleplans', function(req,res){
	request.get({url:rest_url+'scheduleplans', headers: {"Bridge-Session":req.headers.sessiontoken}}, function (e, r, result) {
		res.statusCode = r.statusCode;
		res.send(result);
	});
});


app.listen(port, function(){
	console.log("App is running on "+ port);
});