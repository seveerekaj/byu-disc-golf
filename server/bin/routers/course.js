/*
* This router gets information for the various holes in the course.
*/

"use strict";
var express = require('express');
var router = express.Router();
const path = require('path');

var templates = require('./response-templates');
var holeService = require('../service/hole_service');

let projectPath = path.resolve(__dirname, '../');

/* GET home page. */
router.get('/', function(req, res) {
  var response = templates.success_template;
  var msg = "Welcome to the BYU Disk Golf API. ";
  msg += "To get more information about a specific hole, ";
  msg += "please target the path \"/course/hole/<hole number>\". ";
  msg += "and be sure to replace <hole number> with the number of ";
  msg += "the hole which you would like to query.";
  response["message"] = msg;
  res.json(response);
});

router.get('/hole/', function(req, res) {
  var response = templates.success_template;
  response.message = "Please provide a hole number in the URL.";
  res.json(response);
});

router.get('/hole/:holeNumber', function(req, res) {
  var holeNumber = req.params.holeNumber;
  var response;
  holeService.getHole(holeNumber, function(hole) {
    if (hole) {
      response = templates.success_template;
      response.message = "Information for hole " + holeNumber;
      response["hole"] = hole;
    } else {
      response = templates.failure_template;
      response.message = holeNumber + ": invalid hole number. Please provide a valid hole number and try agian.";
    }
    res.json(response);
  });
});

module.exports = router;