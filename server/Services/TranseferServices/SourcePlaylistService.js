'use strict';

const HttpStatus = require('http-status-codes');
const ProviderContext = require('./Providers/ProviderContext.js');

module.exports.setSourcePlaylist = function() {
	return function(request, response) {
		var promise = ProviderContext.getSourcePlaylistProvider(request, response);
		promise.then(function(context) {
			context.getPlaylist();
		});
	};
};