/*
UserSharing has user which has created the playlist, playlist itself, version of the playlist and list of users with which the playlist has been shared with.
*/

module.exports = function(db, cb) {
	var UserSharing = db.define('UserSharing', {
		id : {
			type: 'serial', 
			key: true
		}
	});

	UserSharing.hasOne('playlist', db.models.Playlist, {
		required : true, 
		reverse : 'sharings',
	});

	UserSharing.hasOne('version', db.models.SourcePlaylistVersion, { required : true });

	UserSharing.hasOne('sender', db.models.User, { 
		required : true,
		reverse : 'sharedPlaylists'
	});

	UserSharing.hasMany('receivers', db.models.User, {}, { reverse: 'receivedPlaylists', key: true });
}