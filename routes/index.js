"use strict";
var express = require('express');
var router = express.Router();
const path = require('path');

let projectPath = path.resolve(__dirname, '../');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(projectPath, 'public/html/index.html'));
});

router.get('/doge', function(req, res, next) {
  res.sendFile(path.resolve(projectPath, 'public/images/frisbee-dog.jpg'))
});

router.get('/map', function(req, res, next) {
  res.sendFile(path.resolve(projectPath, 'public/images/map.jpg'))
});

module.exports = router;
