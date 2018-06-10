'use strict';

module.exports = function(db, cb) {
	var StreamingPlatform = db.define('StreamingPlatform', {
		id : {
			type : 'serial',
			key : true
		},
		name : {
			type : 'text',
			required : true,
		},
		apiUrl : {
			type : 'text',
			required : true,
		},
	});
}