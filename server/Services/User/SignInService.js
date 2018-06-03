'use strict';

const HttpStatus = require('http-status-codes');
const PasswordHelper = require('./PasswordHelper.js');

module.exports.signIn = function() {
	return function(request, response, next) {
		var userNameOrEmail = request.body.userNameOrEmail || '',
			password = request.body.password || '';

		request.models.users.exists({or : [{ username : userNameOrEmail }, { email : userNameOrEmail }]}, function(err, exists) {
			if (!exists) {
				response.status(HttpStatus.BAD_REQUEST).send({ error : 'UserName or email does not exist.' });
				return;
			}
		});

		request.models.users.one({or : [{ username : userNameOrEmail }, { email : userNameOrEmail }]}, function(err, user) {
			var pass = PasswordHelper.sha512(password, user.salt);
			if (pass.passwordHash !== user.password) {
				response.status(HttpStatus.BAD_REQUEST).send({ error : 'Invaild password.' });
				return;
			}

			response.status(HttpStatus.OK).send();
			next();
		});
	};
};