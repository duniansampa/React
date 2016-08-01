var express         	 = require('express'),
    path            	 = require('path'),
	favicon         	 = require('static-favicon'),
	logger           	 = require('morgan'),
	cookieParser     	 = require('cookie-parser'),
	bodyParser   	 	 = require('body-parser'),
	session      	 	 = require('express-session'),
	mongoose         	 = require('mongoose'),
	flash            	 = require('express-flash'),
	moment            	 = require('moment'),
	expressValidator 	 = require('express-validator'),
	webpack 		 	 = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config 				 = require('./../webpack.config');
	home 				 = require('./routes/home'),
    amigos 				 = require('./routes/amigos'),
    contatos    		 = require('./routes/contatos'),
    usuario				 = require('./routes/usuario');

var app  = express(); 

//conexão com o mongodb
mongoose.connect('mongodb://localhost/siglog', function(err){
	if(err){
		console.log("Erro ao conectar no mongodb: "+err);
	}else{
		console.log("Conexão com o mongodb efetuada com sucesso!");
	}
});

//middleware
var erros = require('./middleware/erros');

//webpack
var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({ secret: 'siglogsecret' }));
app.use(express.static(path.join(__dirname, '/../client/public')));
app.use(flash());

//helpers
app.use(function(req,res,next){
	res.locals.session  = req.session.usuario;
	res.locals.isLogged = req.session.usuario ? true : false;
	res.locals.moment   = moment;
	next();
});

app.use('/', home);
app.use('/amigos',amigos);
app.use('/contatos',contatos);
app.use('/usuarios', usuario);

//middleware
app.use(erros.notfound);

// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//middleware
app.use(erros.serverError);

module.exports = app;
