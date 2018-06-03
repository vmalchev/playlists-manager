'use strict';

const SignIn = require('../Services/User/SignInService.js');
const SignUp = require('../Services/User/SignUpService.js');
const SignOut = require('../Services/User/SignOutService.js');

const Middwares = require('./Middwares.js');

const HttpStatus = require('http-status-codes');

var express = require('express');
var router = express.Router();

var createSession = function() {
	return function(request, response) {
		request.session.authenticated = true;
	};
};

router.post('/signin', SignIn.signIn(), createSession());

router.post('/signup', SignUp.validateUserName(), SignUp.validateEmail(), SignUp.validatePassword(), SignUp.createUser(), createSession());

router.get('/signout', Middwares.requireLogin(), SignOut.signOut());

module.exports = router;