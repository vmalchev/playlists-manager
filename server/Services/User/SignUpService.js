'use strict';

const HttpStatus = require('http-status-codes');
const crypto = require('crypto');
const PasswordHelper = require('./PasswordHelper.js');
const MIN_PASSWORD_LENGTH = 8;

var validateUserName = function() {
	return function (request, response, next) {
		var userName = request.body.userName;
		if (!userName) {
			response.status(HttpStatus.BAD_REQUEST).send({ error : 'UserName is missing.' });
		}

		request.models.users.exists({ username : userName }, function (err, exists) {
			if (exists) {
				response.status(HttpStatus.BAD_REQUEST).send({ error : 'UserName is already taken.' });
				return;
			}
		});

		next();
	};
};

var validateEmail = function() {
	return function(request, response, next) {
		var email = request.body.email;
		if (!email) {
			response.status(HttpStatus.BAD_REQUEST).send({ error : 'Email is missing.' });
			return;
		}

		var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailPattern.test(String(email).toLowerCase())) {
			response.status(HttpStatus.BAD_REQUEST).send({ error : 'Invalid email.' });
			return;
		}

		request.models.users.exists({ email: email }, function(err, exists) {
			if (exists) {
				response.status(HttpStatus.BAD_REQUEST).send({ error : 'Email is already in use.' });
				return;
			}
		});

		next();
	}
};

var validatePassword = function() {
	return function(request, response, next) {
		var password = request.body.password;
		if (!password) {
			response.status(HttpStatus.BAD_REQUEST).send({ error : 'Password is missing.' });
			return;
		}

		if (password.length < MIN_PASSWORD_LENGTH) {
			response.status(HttpStatus.BAD_REQUEST).send({ error : 'Your password must be at least 8 characters' });
			return false;
		}

		if (password.search(/[a-z]/i) < 0) {
			response.status(HttpStatus.BAD_REQUEST).send({ error : 'Your password must contain at least one letter.' });
			return false;
		}

		if (password.search(/[0-9]/) < 0) {
			response.status(HttpStatus.BAD_REQUEST).send({ error : 'Your password must contain at least one digit.' });
			return false;
		}

		var passwordConfirmation = request.body.passwordConfirmation;
		if (password !== passwordConfirmation) {
			response.status(HttpStatus.BAD_REQUEST).send({ error : 'Password and confirmation do not match.' });
			return;
		}

		next();
	};
};

var createUser = function() {
	return function(request, response, next) {
		var salt = genRandomString(16); /** Gives us salt of length 16 */
		var password = PasswordHelper.sha512(request.body.password, salt);

		request.models.users.create({
			username : request.body.userName,
			email : request.body.email,
			password : password.passwordHash,
			salt : password.salt,
		}, function (err, user) {
			if (err) {
				console.log(err);
				return;
			}

			next();
		});
	};
};

var genRandomString = function(length){
	return crypto.randomBytes(Math.ceil(length/2))
		.toString('hex') /** convert to hexadecimal format */
		.slice(0,length); /** return required number of characters */
};

module.exports.validateUserName = validateUserName;
module.exports.validateEmail = validateEmail;
module.exports.validatePassword = validatePassword;
module.exports.createUser = createUser;