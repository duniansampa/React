var express 	= require('express');
var router 		= express.Router();
var home        = require('../controllers/home');
var autenticar 	= require('../middleware/autenticar');

	
router.route('/')
	  .get(home.login)
	  .post(home.autenticacao);

router.route('/home').get(autenticar, home.index);
router.route('/logout').get(home.logout);

router.route('/email')
	  .get(autenticar, home.email)
	  .post(home.enviar);


module.exports = router;