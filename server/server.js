"use strict";

const http = require('http');
const orm = require('orm');
const express = require('express');
const path = require('path');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();

// const rootPath = path.normalize(path.join(__dirname, '..'));
const genericRoutes = require('./Routes/GenericRoute');
const userRoutes = require('./Routes/UserRoute');
const transferRoutes = require('./Routes/TransferRoute');
const playlistRoutes = require('./Routes/PlaylistRoute');
const HttpStatus = require('http-status-codes');

const SERVER_PORT = 3001;
const app = express();

// app.use(cookieParser());

app.use(session({
	secret : 'bruce wayne is batman',
	resave : true,
	saveUninitialized : false,
	/// key : 'batman',
	store : new redisStore({
		host : 'localhost', 
		port : 6379,
		storage : 'redis',
		client : client,
	}),
	cookie : {
		expires: 600000,
	},
}));

app.use(cookieParser("bruce_wayne_is_batman"));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

const connectionString = 'mysql://root:@localhost/playlist_manager';
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
			if(err) {
				throw err;
			}
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

app.use(function (req, res, next) {
	next();
});

app.use('/api', genericRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/playlists', playlistRoutes);

// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handlers
// development error handler
// will print stacktrace
/*
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json('error', {
      message: err.message,
      error: err
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json('error', {
      message: err.message,
      error: {}
    });
  });
} */

/*
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key"})); */


app.listen(SERVER_PORT); // read it from server configuration

///module.exports = app;