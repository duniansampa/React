var express 	= require('express');
var router 		= express.Router();
var usuario     = require('../controllers/usuarios');
var autenticar 	= require('../middleware/autenticar');


router.route('/').get(autenticar, usuario.index);

router.route('/create')
	  .get(autenticar, usuario.create)
	  .post(usuario.post);

router.route('/show/:id').get(autenticar, usuario.show);
router.route('/delete/:id').post(usuario.delete);

router.route('/edit/:id')
	  .get(autenticar, usuario.edit)
	  .post(usuario.update);


module.exports = router;