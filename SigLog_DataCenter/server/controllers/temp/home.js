var Usuario    = require('../models/usuarios'),
    validacao  = require('../validacoes/autenticacao'),
    nodemailer = require('nodemailer'),
    path	   = require('path');

var HomeController = {
	index: function(req,res){
    	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
	},

	login: function(req,res){
		//res.sendFile(path.join(__dirname,'../../client/views/react.html'));
	},

	autenticacao: function(req,res){
		var usuario  = new Usuario();
		var email    = req.body.email;
		var password = req.body.password;

		if(validacao(req,res)){
			Usuario.findOne({'email': email}, function(err,data){
				if(err){
					req.flash('erro', 'Erro ao entrar no sistema: '+err);
					res.redirect('/');
				}else if(!data){
					req.flash('erro', 'E-mail não encontrado!');
					//cadastar o primeiro usuário do sistema.
					/*
					usuario.email = email;
					usuario.password = usuario.generateHash(password);
					usuario.save(function(err){
						if(err){
							req.flash('erro', 'Erro ao cadastrar: '+err);
							res.redirect('/');
						}else{
							req.flash('info', 'Registro cadastrado com sucesso!');
							res.redirect('/');
						}
					});
					*/
					res.redirect('/');
				}else if(!usuario.validPassword(password, data.password)){
					req.flash('erro', 'Senha não confere!');
					res.redirect('/');
				}else{
					req.session.usuario = data;
					res.redirect('/home');
				}
			});
		}else{
			res.redirect('/');
		}
	}, 

	logout: function(req,res){
		req.session.destroy();
		res.redirect('/');
	},

	email: function(req,res){
		res.render('home/email');
	},

	enviar: function(req,res){
		var transport = nodemailer.createTransport("SMTP", {
			host: "smtp.mandrillapp.com",				
			port: 587,
			auth:{
				user: "duniansampa@outlook.com",
				pass: "07JThs7zxI5KYrHaAM2mjg"
			}
		});

		var mailOptions = {
			from: req.body.nome+" <"+req.body.email+">",
			to: "duniansampa@outlook.com",
			subject: req.body.assunto,
			text: req.body.mensagem
		}

		transport.sendMail(mailOptions, function(err, response){
			if(err){
				req.flash('erro', 'Erro ao enviar e-mail: '+err);
				res.redirect('/email');
			}else{
				req.flash('info', 'E-mail enviado com sucesso!');
				res.redirect('/email');
			}				
		});
	}
}

module.exports = HomeController;
