var express 	= require('express');
var router 		= express.Router();
var contato     = require('../controllers/contatos');
var autenticar 	= require('../middleware/autenticar');


router.route('/:id').get(autenticar, contato.index);
router.route('/create/:id')
	  .get(autenticar, contato.create)
	  .post(contato.post);

router.route('/delete/:id/:amigo').post(contato.excluir);


module.exports = router;