var express 	= require('express');
var router 		= express.Router();
var amigo      	= require('../controllers/amigos');
var autenticar 	= require('../middleware/autenticar');


router.route('/').get(autenticar, amigo.index);

router.route('/create')
	  .get(autenticar, amigo.create)
	  .post(amigo.salvar);

router.route('/show/:id').get(autenticar, amigo.show);
router.route('/delete/:id').post(amigo.excluir);

router.route('/edit/:id')
	  .get(autenticar, amigo.editar)
	  .post(amigo.update);

module.exports = router;