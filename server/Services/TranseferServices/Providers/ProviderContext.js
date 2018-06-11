'use stirct';

const YouTube = require('./YouTube.js');

module.exports.getSourcePlaylistProvider = function(request, response) {
	return new Promise(function (resolve, reject) {
		var playlistUrl = request.body.playlistUrl;

		const PatternYoutube = /^https:\/\/(www\.?)youtube\.com\/watch\?v=[\w-]{11}(\&index=\d+|)\&list=(\w*)(\&index=\d+|)/;

		if (playlistUrl.match(PatternYoutube)) {
			var playlistId = playlistUrl.match(PatternYoutube)[3];
			request.models.streamingPlatforms
				.oneAsync({ name : 'youtube' })
				.then(function(streamingPlatform) {
					request.models.platformSettings.findAsync({ streamingPlatform : streamingPlatform })
						.then(function(platformSettings) {
							resolve(new YouTube(playlistId, streamingPlatform, platformSettings))
						});
				});
		} else {
			reject(null);
		}
	});
};