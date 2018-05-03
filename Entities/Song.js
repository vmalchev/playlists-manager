'use strict';

module.exports = function(db, cb) {
	var Song = db.define('Song', {
		id : {
			type : 'serial',
			key : true
		},
		title : {
			type : 'text',
		}
	});
}