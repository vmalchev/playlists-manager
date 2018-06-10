'use strict';

const request = require('request');

class AbstractProvider {
	constructor(playlistId, sourceProvider, platformSettings) {
		this.playlistId = playlistId;
		this.sourceProvider = sourceProvider;
		this.platformSettings = platformSettings;
	}

	getPlaylist() {
	}

	getApiUrl() {
		var url = this.sourceProvider.apiUrl,
			settings = this.platformSettings;

		for (var i = 0; i < settings.length; i++) {
			url += "&" + settings[i].key + "=" + settings[i].value;
		}

		return url;
	}

	doRequest(url) {
		return new Promise(function(resolve, reject) {
			request(url, { json: true }, (err, res, body) => {
				if (err) { 
					reject(err);
				}
				
				console.log('body ' + body);
				resolve(body);
			});
		});
	}
};

module.exports = AbstractProvider;