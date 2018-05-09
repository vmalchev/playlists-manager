'use strict';

var service = require('../Services/UserService');

var express = require('express');
var router = express.Router();

router.get('/Login', function(req, res) {
	// todo: implement
	// console.log('na baba ti 4erviloto');
	service.GetLogin(req);
	res.send('Ok');
});

router.post('/Login', function(req, res) {
	// todo: implement
});

router.get('/SignUp', function(req, res) {
	// todo: implement
});

router.post('/SignUp', function(req, res) {
	// todo: implement
});

router.post('/Logout', function(req, res) {
	// todo: implement
});

module.exports = router;