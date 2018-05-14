"use strict";

var http = require('http');
var express = require('express');
var app = express();
var orm = require('orm');
var path = require('path');

var connectionString = 'mysql://root:@localhost/playlist_manager';
app.use(orm.express(connectionString, { 
	define: function (db, models, next) {
		var errorHanler = function (err) {
			console.log('error occured ');
			console.error(err, err.stack);
		};

		db.load('./Entities/Song.js', errorHanler);
		db.load('./Entities/StreamingPlatform.js', errorHanler);
		db.load('./Entities/PlatformSetting.js', errorHanler);
		db.load('./Entities/Playlist.js', errorHanler);
		db.load('./Entities/SourcePlaylist.js', errorHanler);
		db.load('./Entities/SourcePlaylistVersion.js', errorHanler);
		db.load('./Entities/User.js', errorHanler);
		db.load('./Entities/UserSharing.js', errorHanler);

		db.sync(function(err) {
			if (err) throw err;
		});

		models.songs = db.models.Song;
		models.streamingPlatforms = db.models.StreamingPlatform;
		models.platformSettings = db.models.PlatformSetting;
		models.playlists = db.models.Playlist;
		models.sourcePlaylists = db.models.SourcePlaylist;
		models.sourcePlaylistVersions = db.models.SourcePlaylistVersion;
		models.users = db.models.User;

        next();
    }
}));

app.listen('3001'); // read it from server configuration

// might be moved to IndexController.js
app.get('/', function(requst, response) {
	// redirect to Home Controller
	// response.redirect('/Home');
	response.sendFile(__dirname + '/index.html');
});

app.get('/Song/:id', function(request, response) {
	request.models.songs.get(1, function(err, song) {
		console.log(song);
	});
});

app.post('/Song', function(request, response) {
	console.log(request.models.songs.create);
	console.log();

	request.models.songs.create({
		title : 'Foo Fighters - Best of you',
	}, function(err, song) {
		if (err !== undefined && err !== null) {
			console.error('ong error ' + err);
			return;
		}

		console.log(song);
	});
	response.send('OK');
});