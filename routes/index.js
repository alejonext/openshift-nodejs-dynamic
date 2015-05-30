var app = express();
const ghost = require('ghost');
const vhost = require('vhost');

app.set('query parser', require('node-qs-serialization').deparam );
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin',  '*' );
	res.setHeader('Access-Control-Allow-Methods', 'X-Requested-With, GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	/*if(req.method === 'OPTIONS') req.headers.origin ||
		return res.status(202).end();*/

	next();
});

[
	// YOUR VHOST
	require('./andother.com')
].forEach(function (item) {
	app.use(vhost(item.get('url'), item));
});

// When use gHost!!
ghost({
	config: path.join(__dirname, 'alejonext.co', 'index.js')
}).then(function (ghostServer) {
	app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
	ghostServer.start(app);
}).catch(function (err) {
    console.log(err.message, err.stack);
});

module.exports = app;