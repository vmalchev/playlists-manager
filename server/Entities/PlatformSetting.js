'use strict';

module.exports = function(db, cb) {
	var PlatformSetting = db.define('PlatformSetting', {
		id : {
			type : 'serial',
			key : true
		},
		key : {
			type : 'text',
		},
		value : {
			type : 'text'
		}
	});

	PlatformSetting.hasOne('streamingPlatform', db.models.StreamingPlatform, {
		required : true,
		reverse : 'PlatformSetting'
	});
}