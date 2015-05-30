var app = express();

var home = function (req, res, next) {
	res.send('Home');
};

var now = function (req, res) {
	res.json(req.query);
};

var change = function (req, res) {
	res.json({
		hello : 'world',
		post : req.body,
		query : req.query
	});
};

app.all('/', home);
app.all('/get', now);
app.post('/post', change);

app.set('url', 'andother.com');

module.exports = app;