'use strict';

module.exports = function(db, cb) {
	var Playlist = db.define('Playlist', {
		id : {
			type: 'serial', 
			key: true
		},
		name : {
			type : 'text'
		}
	});
}