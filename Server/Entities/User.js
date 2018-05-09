'use strict';

module.exports = function(db, cb) {
	var User = db.define('User', {
		id : {
			type: 'serial', 
			key: true
		},
		username : {
			type : 'text',
			unique: true,
			required: true
		},
		email : {
			type: 'text',
			unique: true,
			required: true
		},
		password : {
			type: 'text',
			required: true
		}
	});


	User.hasMany('sourcePlaylists', db.models.SourcePlaylist, { version: String }, { reverse: 'users', key: true });
	User.hasMany('playlists', db.models.Playlist, {}, { reverse: 'users', key: true });
}