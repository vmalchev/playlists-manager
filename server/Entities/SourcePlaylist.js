'use strict';

module.exports = function(db, cb) {
	var SourcePlaylist = db.define('SourcePlaylist', {
		id : {
			type: 'serial', 
			key: true
		},
		code : { 
			type : 'text'
		}
	});

	SourcePlaylist.hasOne('streamingPlatform', db.models.StreamingPlatform, {
		required : true, 
		reverse : 'sourcePlaylists'
	});
}