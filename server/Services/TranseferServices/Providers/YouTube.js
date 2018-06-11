'use strict';

const AbstractProvider = require('./AbstractProvider.js');

class YouTube extends AbstractProvider {
	constructor(playlistId, sourceProvider, platformSettings) {
		super(playlistId, sourceProvider, platformSettings);
	}

	getApiUrl(nextPageToken) {
		return super.getApiUrl() + '&playlistId=' + this.playlistId + (nextPageToken !== null ? '&pageToken=' + nextPageToken : '');
	}

	async getPlaylist() {
		var url,
			titles = [],
			doRequest = super.doRequest,
			nextPageToken = null,
			nextToken = true;

		while (true) {
			url = this.getApiUrl(nextPageToken);

			let response = await doRequest(url);
			for (var i = 0; i < response.items.length; i++) {
				titles.push(response.items[i].snippet.title);
			}

			nextPageToken = response.nextPageToken;
			if (nextPageToken === undefined) {
				break;
			}
		}

		return titles;
	}
}

module.exports = YouTube;