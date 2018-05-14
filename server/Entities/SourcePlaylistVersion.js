'use strict';

module.exports = function(db, cb) {
	var SourcePlaylistVersion = db.define('SourcePlaylistVersion', {
		id : {
			type: 'serial', 
			key: true
		},
		version : {
			type : 'integer',
		}
	});

	SourcePlaylistVersion.hasOne('sourcePlaylist', db.models.SourcePlaylist, {
		required : true,
		reverse : 'versions'
	});

	SourcePlaylistVersion.hasOne('playlist', db.models.Playlist, {
		required : true,
		reverse : 'versions'
	});

	SourcePlaylistVersion.hasMany('songs', db.models.Song, {}, {});
}