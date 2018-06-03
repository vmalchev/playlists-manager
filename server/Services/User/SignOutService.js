'use strict';

const HttpStatus = require('http-status-codes');

var signOut = function() {
	return function(request, response) {
		request.session.destroy(function(err) {
			if (err) {
				response.status(HttpStatus.InternalServerrError).send({ error : err });
				return;
			}

			response.status(HttpStatus.OK).send();
		});
	};
};

module.exports.signOut = signOut;