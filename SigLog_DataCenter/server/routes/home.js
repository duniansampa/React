var express 	= require('express');
var router 		= express.Router();
var stormpath  =  require('express-stormpath');
var home     = require('../controllers/home');



 router.route('/me')
 	  .post(stormpath.loginRequired, home.autenticacao);
 
router.route('*').get(home.index);

module.exports = router;