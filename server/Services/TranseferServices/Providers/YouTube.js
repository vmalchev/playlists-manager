'use strict';

const AbstractProvider = require('./AbstractProvider.js');

class YouTube extends AbstractProvider {
	constructor(playlistId, sourceProvider, platformSettings) {
		super(playlistId, sourceProvider, platformSettings);
	}

	getApiUrl(nextPageToken) {
		return super.getApiUrl() + (nextPageToken !== null ? '&pageToken=' + nextPageToken : '');
	}

	getPlaylist() {
		var url = this.getApiUrl(null),
			titles = [],
			doRequest = super.doRequest,
			nextPageToken;

		while (true) {
			doRequest(url).then(data => {
				if (data === null) {
					return;
				}

				nextPageToken = data['nextPageToken'];
			});
			
			if (nextPageToken === undefined) {
				break;
			}
			url += getApiUrl(nextPageToken);
		}

		return titles;
	}
}

module.exports = YouTube;