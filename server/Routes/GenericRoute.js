'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(requst, response) {
	response.send('Ok');
});

module.exports = router;