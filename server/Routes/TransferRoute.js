'use strict';

const SourcePlaylistService = require('../Services/TranseferServices/SourcePlaylistService.js');

var express = require('express');
var router = express.Router();


router.post('/sourcePlaylist', SourcePlaylistService.setSourcePlaylist());

router.get('/Platforms', function(req, res) {});

router.post('/Platforms', function(req, res) {});

router.get('/PlaylistSettings', function(req, res) {});

router.post('/PlaylistSettings', function(req, res) {});

module.exports = router;