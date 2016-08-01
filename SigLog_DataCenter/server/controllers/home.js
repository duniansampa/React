path    = require('path');
var HomeController = {
	index: function(req,res){
    	res.sendFile(path.join(__dirname, '../../client/views/index.html'));
	},

	autenticacao: function(req, res){

		function writeError(message) {
			res.status(400);
			res.json({ message: message, status: 400 });
			res.end();
		} 
     
		function saveAccount () {
			req.user.givenName = req.body.givenName;
			req.user.surname = req.body.surname;
			req.user.email = req.body.email;

			req.user.save(function (err) {
			if (err) {
				return writeError(err.userMessage || err.message);
			}
			res.end();
			});
		}

		if (req.body.password) {
			var application = req.app.get('stormpathApplication');

			application.authenticateAccount({
			username: req.user.username,
			password: req.body.existingPassword
			}, function (err) {
			if (err) {
				return writeError('The existing password that you entered was incorrect.');
			}

			req.user.password = req.body.password;

			saveAccount();
			});
		} else {
			saveAccount();
		}
	}
}

module.exports = HomeController;
