// set up express
const express = require('express');
const app = express();


// this we need to set if we use hbs
app.set('view engine', 'hbs');



// this registers the public folder it can be accessed in the browser
app.use(express.static(__dirname + '/public'));

const port = 5000;

// this line is needed for express to be able to handle the request body
app.use(express.urlencoded({ extended: false }));

// middleware
let accessCount = 0;
function count() {
	return (req, res, next) => {
		accessCount++;
		console.log(accessCount);
		// we are done now proceed as originally intended
		next();
	}
}

// register a middleware globally (for all routes)
app.use(count());

// adding a middleware for this route
app.get('/', count(), (req, res, next) => {
	res.render('form');
})

app.post('/post-example', (req, res, next) => {
	// access the request body
	// console.log(req.body);
	const username = req.body.user;
	res.render('dashboard', { username: username })
})

// start the server
app.listen(port, function () {
	console.log(`Server listening on port ${port}`)
});