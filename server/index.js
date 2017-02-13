// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var noteModel = require('./note');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

var port     = process.env.PORT || 4500; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/emberMongo'); // connect to our database
var Goal     = require('./models/goal');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:4500/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /goals
// ----------------------------------------------------
router.route('/goals')
	// create a Goal (accessed at POST http://localhost:4500/goals)
	.post(function(req, res) {
		var goal = new Goal();		// create a new instance of the goal model
		goal.title = req.body.goal.title;  // set the goals name (comes from the request)
		goal.owner = req.body.goal.owner;
		goal.notes = req.body.goal.notes;
		goal.save(function(err) {
			if (err)
				res.send(err);
			res.json({ id:'123', message: 'Goal created!' });
		});
	})
	// get all the goals (accessed at GET http://localhost:4500/api/goals)
	.get(function(req, res) {
		Goal.find(function(err, goals) {
			if (err)
				res.send(err);
			res.send({goal:goals});
			// res.json(goals);
		});
	});

router.route('/notes')
	// create a Goal (accessed at POST http://localhost:4500/goals)
	// get all the goals (accessed at GET http://localhost:4500/api/goals)
	.get(function(req, res) {
		noteModel.find({},function(err,docs) {
			if(err) {
				res.send({error:err});
			}
			else {
				res.send({note:docs});
			}
		});
	});

// on routes that end in /goals/:bear_id
// ----------------------------------------------------
router.route('/goals/:goal_id')
	// get the goal with that id
	.get(function(req, res) {
		Goal.findById(req.params.bear_id, function(err, goal) {
			if (err)
				res.send(err);
			res.json(goal);
		});
	})

	// update the goal with this id
	.put(function(req, res) {
		Goal.findById(req.params.bear_id, function(err, goal) {
			if (err)
				res.send(err);
			goal.name = req.body.name;
			goal.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'goal updated!' });
			});
		});
	})

	// delete the goal with this id
	.delete(function(req, res) {
		Goal.remove({
			_id: req.params.bear_id
		}, function(err, goal) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
