var express = require('express');
var router = express.Router();              // get an instance of the express Router
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var noteModel = require('./note');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

mongoose.connect('mongodb://localhost/emberMongo');

app.get('/api/',function(req,res) {
	res.send('Working\n');
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', function(req, res) {
	var newNote = User({
		title: 'Test Title',
		content: 'This is another Content',
		author: 'Prashanth Yerramilli'
	});
	// save the user
	newNote.save(function(err) {
		if (err) throw err;
		console.log('User created!');
	});
  	console.log('Hellooooooooooooooooo!');
});

app.get('/db', function(req, res){

});

app.get('/api/notes', function(req,res) {
	noteModel.find({},function(err,docs) {
		if(err) {
			res.send({error:err});
		}
		else {
			res.send({note:docs});
		}
	});
});

app.listen('4500');
