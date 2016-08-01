var 
	//Framework designed for building single-page, multi-page, and hybrid web applications
	express         	 = require('express'),
	//The path module provides utilities for working with file and directory paths
    path            	 = require('path'),
	//Express-Stormpath is an extension for Express.js that makes it incredibly simple to add user authentication to your application, 
	//such as login, signup, authorization, and social login.
	stormpath         	 =  require('express-stormpath'),
	//Create a new morgan logger middleware function using the given  format  and  options 
	logger           	 = require('morgan'),
	//Parse  Cookie  header and populate  req.cookies  with an object keyed by the cookie names
	cookieParser     	 = require('cookie-parser'),
	//Parse incoming request bodies in a middleware before your handlers, available under the  req.body  property.
	bodyParser   	 	 = require('body-parser'),
    //Elegant MongoDB object modeling for Node.js
	mongoose         	 = require('mongoose'),
	//Parse, validate, manipulate, and display dates in JavaScript.
	moment            	 = require('moment'),
	//webpack is a bundler for modules
	webpack 		 	 = require('webpack'),
	//It's a simple wrapper middleware for webpack. It serves the files emitted from webpack over a connect server.
    webpackDevMiddleware = require('webpack-dev-middleware'),
	//This allows you to add hot reloading into an existing server without webpack-dev-server.
	//This allows you to add hot reloading into an existing server without webpack-dev-server.
    webpackHotMiddleware = require('webpack-hot-middleware'),
	//Webpack config file.
    config 				 = require('./../webpack.config'),
	
	//home route
	home 				 = require('./routes/home');
	

var app  = express(); 


//conexão com o mongodb
// mongoose.connect('mongodb://localhost/siglog', function(err){
// 	if(err){
// 		console.log("Erro ao conectar no mongodb: "+err);
// 	}else{
// 		console.log("Conexão com o mongodb efetuada com sucesso!");
// 	}
// });

//middleware
var erros = require('./middleware/erros');
//webpack
var compiler = webpack(config);

app.use(logger('combined'));
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// Init the stormpath
app.use(stormpath.init(app, {
  web: {
    produces: ['application/json']
  }
}));

app.use(express.static(path.join(__dirname, '/../client/public')));

app.use('*', home);
 
//middleware
app.use(erros.notfound);


//middleware
app.use(erros.serverError);

module.exports = app;
