const Router = require('express').Router();
const passport = require('passport');

const User = require('./user');

Router.route('/')
    .get((req, res) => { res.render('signin') })
	.post(passport.authenticate('local', {
		successRedirect: '/confidential',
		failureRedirect: '/'
		}),
		(req, res) => {})
;

/* Temp Code */
/*
Router.route('/signup')
    .get((req, res) => { res.render('signup') })
    .post((req, res) => { 
		User.register(new User({ username: req.body.username }),
		req.body.password, 
        (err, user) => {
				if(err) {
					console.log(err);
					return res.render('signup')
				}
				passport.authenticate('local')(req, res, () => {
						res.redirect('/confidential');
				});
		});
	});
;
*/


Router.route('/confidential')
	.get((req, res) => { 
		if(req.isAuthenticated()) {
			res.render('confidential');
		} else {
			res.redirect('/');
		}
	});

Router.route('/reset')
	.get((req, res) => { res.render('reset') })
	.post((req, res) => {
		User.deleteMany({}, (err) => { if(err){ console.log(err); console.log('db deleted'); } });
	});
module.exports = Router;
