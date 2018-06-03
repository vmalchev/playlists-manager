'use strict';

const HttpStatus = require('http-status-codes');

var requireLogin = function() {
	return function(request, response, next) {
		if (request.session && request.session.authenticated) {
			next();
		} else {
			response.status(HttpStatus.UNAUTHORIZED).send({ error : 'Not logged in' });
		}
	};
};

module.exports.requireLogin = requireLogin;