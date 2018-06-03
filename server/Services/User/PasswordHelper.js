'use strict';

const crypto = require('crypto');

module.exports.sha512 = function(password, salt){
	var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
	hash.update(password);
	var value = hash.digest('hex');

	return {
		salt : salt,
		passwordHash : value,
	};
};